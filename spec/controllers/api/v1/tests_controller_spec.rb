require 'rails_helper'

RSpec.describe Api::V1::TestsController, type: :controller do
  let!(:student) { create :user, :student }
  let!(:teacher) { create :user, :teacher }
  describe '#index' do
    let!(:topic) { create :topic }
    context 'index page' do
      it 'should return error if not login' do
        get :index
        json_response = JSON.parse(response.body)
        expect(json_response['message']).to eq('Need login!')
      end

      it 'should return all topics' do
        sign_in(student)
        get :index
        json_response = JSON.parse(response.body)
        expect(json_response['result'].first).to eq(JSON.parse(TopicSerializer.new(topic).to_json))
      end
    end
  end

  describe '#create' do
    context 'student' do
      it 'should return error if login by student' do
        sign_in(student)
        post :create
        json_response = JSON.parse(response.body)
        expect(json_response['message']).to eq('Not teacher!')
      end
    end

    context 'teacher' do
      it 'should return error if not login' do
        post :create
        json_response = JSON.parse(response.body)
        expect(json_response['message']).to eq('Need login!')
      end

      it 'should raise error if has more than 1 correct answer' do
        data = {
          "name" => "Topic 1",
          "description" => "This is description for topic 1",
          "questions" => [
            {
              "title" => "Question 1",
              "description" => "This is description for question 1",
              "answers" => [
                {
                  "content" => "Option 1",
                  "correct" => true
                },
                {
                  "content" => "Option 2",
                  "correct" => true
                }
              ]
            }
          ]
        }
        sign_in(teacher)
        post :create, params: data
        json_response = JSON.parse(response.body)
        expect(json_response['message']).to eq('Validation failed: Question cannot have another correct answer')
      end

      it 'should create new topic, question and answer' do
        data = {
          "name" => "Topic 1",
          "description" => "This is description for topic 1",
          "questions" => [
            {
              "title" => "Question 1",
              "description" => "This is description for question 1",
              "answers" => [
                {
                  "content" => "Option 1",
                  "correct" => true
                },
                {
                  "content" => "Option 2",
                  "correct" => false
                }
              ]
            }
          ]
        }
        sign_in(teacher)
        post :create, params: data
        expect(Topic.all.count).to eq(1)
        expect(Question.all.count).to eq(1)
        expect(Answer.all.count).to eq(2)
      end
    end
  end

  describe '#update' do
    let(:topic) { create :topic }
    let(:question) { create :question, topic_id: topic.id }
    let(:answer) { create :answer, question_id: question.id }

    context 'student' do
      it 'should return error if login by student' do
        data = {
          "id" => topic.id,
          "name" => "Topic 1 After Updated",
          "description" => "This is description for topic 1",
          "questions" => [
            {
              "id" => question.id,
              "title" => "Question 1 After Updated",
              "description" => "This is description for question 1",
              "answers" => [
                {
                  "id" => answer.id,
                  "content" => "Option 1 After Updated",
                  "correct" => true
                }
              ]
            }
          ]
        }
        sign_in(student)
        put :update, params: data
        json_response = JSON.parse(response.body)
        expect(json_response['message']).to eq('Not teacher!')
      end
    end

    context 'teacher' do
      it 'should update new topic, question and answer' do
        data = {
          "id" => topic.id,
          "name" => "Topic 1 After Updated",
          "description" => "This is description for topic 1",
          "questions" => [
            {
              "id" => question.id,
              "title" => "Question 1 After Updated",
              "description" => "This is description for question 1",
              "answers" => [
                {
                  "id" => answer.id,
                  "content" => "Option 1 After Updated",
                  "correct" => true
                }
              ]
            }
          ]
        }
        sign_in(teacher)
        put :update, params: data
        topic.reload
        question.reload
        answer.reload
        expect(topic.name).to eq("Topic 1 After Updated")
        expect(question.title).to eq("Question 1 After Updated")
        expect(answer.content).to eq("Option 1 After Updated")
      end
    end
  end
end
