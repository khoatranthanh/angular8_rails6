module Api::V1
  class AnswersController < ApiController
    def create
      UserAnswer.create(answer_id: params[:answer_id], user: current_api_user)
      render_success({})
    end
  end
end