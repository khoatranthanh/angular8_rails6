require 'rails_helper'

RSpec.describe Api::V1::AnswersController, type: :controller do
  describe '#create' do
    let(:student) { create :user, :student }
    let(:topic) { create :topic }
    let(:question) { create :question, topic_id: topic.id }
    let(:answer) { create :answer, question_id: question.id }

    context 'answer a question' do
      it 'should store answer to user' do
        sign_in(student)
        post :create, params: { id: student.id, answer_id: answer.id }

        expect(UserAnswer.all.length).to eq(1)
        expect(student.answers.first).to eq(answer)
      end
    end
  end
end
