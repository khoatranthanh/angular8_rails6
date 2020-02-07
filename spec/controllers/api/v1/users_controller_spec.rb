require 'rails_helper'

RSpec.describe Api::V1::UsersController, type: :controller do
  let!(:student) { create :user, :student }
  let!(:teacher) { create :user, :teacher }
  describe '#index' do
    context 'index page' do
      it 'should return error if not login' do
        get :index
        json_response = JSON.parse(response.body)
        expect(json_response['message']).to eq('Need login!')
      end

      it 'should return all users' do
        sign_in(student)
        get :index
        json_response = JSON.parse(response.body)
        expect(json_response['result'].first).to eq(JSON.parse(student.to_json))
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

      it 'should create new user' do
        data = {
          "name" => "User 1",
          "email" => "user@example.com",
          "role" => "student",
          "password" => "12345678",
          "password_confirmation" => "12345678"
        }
        sign_in(teacher)
        post :create, params: data
        expect(User.all.count).to eq(3)
      end
    end
  end

  describe '#update' do
    context 'student' do
      it 'should return error if login by student' do
        sign_in(student)
        data = {
          "id" => student.id,
          "name" => "Student after Updated",
          "email" => "user@example.com"
        }
        put :update, params: data
        json_response = JSON.parse(response.body)
        expect(json_response['message']).to eq('Not teacher!')
      end
    end

    context 'teacher' do
      it 'should update user' do
        data = {
          "id" => student.id,
          "name" => "Student after Updated",
          "email" => "user@example.com"
        }
        sign_in(teacher)
        put :update, params: data
        student.reload
        expect(student.name).to eq("Student after Updated")
      end
    end
  end
end
