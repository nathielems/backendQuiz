import pool from '../db';

// Função para salvar o resultado vocacional no banco
export async function saveVocationalResult(user_id: number, maxOption: string): Promise<void> {
  try {
    const connection = await pool.getConnection();
    await connection.query(
      'INSERT INTO vocational_answers (user_id, answer) VALUES (?, ?)',
      [user_id, maxOption]
    );
    connection.release();
  } catch (error) {
    console.error('Error saving vocational result:', error);
    throw error;
  }
}

// Função para obter o resultado vocacional de um usuário
export async function getVocationalResult(user_id: number): Promise<any> {
  try {
    const connection = await pool.getConnection();
    const [rows]: any = await connection.query('SELECT * FROM vocational_answers WHERE user_id = ?', [user_id]);
    connection.release();
    return rows;
  } catch (error) {
    console.error('Error getting vocational result:', error);
    throw error;
  }
}

// Função para obter o teste (perguntas e opções) com base na matéria
export async function getTest(subject: string): Promise<any> {
  if (!subject) {
    throw new Error('Matéria não informada');
  }

  try {
    const connection = await pool.getConnection();

    const [questions] = await connection.execute(`
      SELECT q.id AS questionId, q.question, o.id AS optionId, o.option_label, o.option_text
      FROM questions q
      LEFT JOIN options o ON q.id = o.question_id
      WHERE q.materia = ?;
    `, [subject]);

    connection.release();

    // Organizar as perguntas e opções em uma estrutura adequada
    const questionsMap: any = {};

    (questions as any[]).forEach((row) => {
      if (!questionsMap[row.questionId]) {
        questionsMap[row.questionId] = {
          questionId: row.questionId,
          question: row.question,
          options: []
        };
      }

      questionsMap[row.questionId].options.push({
        optionId: row.optionId,
        optionLabel: row.option_label,
        optionText: row.option_text
      });
    });

    return Object.values(questionsMap);
  } catch (error) {
    console.error('Erro ao buscar perguntas:', error);
    throw error;
  }
}

export async function getTestType(): Promise<any> {
  try {
    const connection = await pool.getConnection();

    const [typeTest] = await connection.execute('SELECT DISTINCT materia, nome_materia FROM questions;');

    connection.release();

    // Retornar a lista de matérias únicas
    return typeTest; 
  } catch (error) {
    console.error('Erro ao buscar matérias:', error);
    throw error;
  }
}