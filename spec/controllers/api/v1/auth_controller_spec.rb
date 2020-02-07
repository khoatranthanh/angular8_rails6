require 'rails_helper'

RSpec.describe Api::V1::AuthController, type: :controller do
  let!(:student) { create :user, :student }
  let!(:teacher) { create :user, :teacher }

  describe '#login' do
    context 'student' do
      it 'should show error message if email invalid' do
        post :login, params: { email: 'xxx@example.com', password: '12345678' }
        json_response = JSON.parse(response.body)
        expect(json_response['message']).to eq('Invalid email or password!')
      end

      it 'should success when login via mobile' do
        request.headers["X-IWA-DEVICE-ID"] = "test_mobile"
        post :login, params: { email: 'student@example.com', password: '12345678' }
        json_response = JSON.parse(response.body)
        expect(json_response['status']).to eq(200)
        expect(json_response['result']['id']).to eq(student.id)
      end

      it 'should error when login via dashboard' do
        post :login, params: { email: 'student@example.com', password: '12345678' }
        json_response = JSON.parse(response.body)
        expect(json_response['message']).to eq('Not teacher!')
      end
    end

    context 'teacher' do
      it 'should show error message if email invalid' do
        post :login, params: { email: 'xxx@example.com', password: '12345678' }
        json_response = JSON.parse(response.body)
        expect(json_response['message']).to eq('Invalid email or password!')
      end

      it 'should success when login via mobile' do
        request.headers["X-IWA-DEVICE-ID"] = "test_mobile"
        post :login, params: { email: 'teacher@example.com', password: '12345678' }
        json_response = JSON.parse(response.body)
        expect(json_response['status']).to eq(200)
        expect(json_response['result']['id']).to eq(teacher.id)
      end

      it 'should success when login via dashboard' do
        post :login, params: { email: 'teacher@example.com', password: '12345678' }
        json_response = JSON.parse(response.body)
        expect(json_response['status']).to eq(200)
      end
    end
  end

  describe '#logout' do
    context 'Student and Teacher logout' do
      it 'should be change access_token' do
        sign_in(student)
        authentication_token = student.authentication_token
        post :logout
        student.reload
        expect(student.authentication_token).not_to eq(authentication_token)
      end
    end
  end
end
