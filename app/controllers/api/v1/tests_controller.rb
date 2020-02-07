module Api::V1
  class TestsController < ApiController
    before_action :authenticate_teacher!, except: [:index, :show]

    def index
      render_success(ActiveModel::ArraySerializer.new(Topic.order(:id), each_serializer: TopicSerializer))
    end

    def create
      Topic.transaction do
        topic = Topic.new(topic_params)
        topic.save!
        # Create question
        params[:questions].each do |q|
          question = topic.questions.new(title: q[:title], description: q[:description])
          question.save!
          # Create answer
          q[:answers].each do |a|
            answer = question.answers.new(JSON.parse(a.to_json))
            answer.save!
          end
        end
      end
      render_success({})
    rescue => e
      render_error(e.message)
    end

    def show
      topic = Topic.find(params[:id])
      render_success(TopicSerializer.new(topic))
    end

    def update
      Topic.transaction do
        topic = Topic.find(params[:id])
        topic.update!(topic_params)

        # Destroy question not in list update
        topic.questions.where.not(id: params[:questions].map{|q| q['id']}.reject { |c| c.blank? }).delete_all
        # Update question
        params[:questions].each do |q|
          # Create
          if q[:id].blank?
            question = topic.questions.new(title: q[:title], description: q[:description])
            question.save!
          # Update
          else
            question = topic.questions.find(q[:id])
            question.update!(title: q[:title], description: q[:description])
          end
          # Destroy answer not in list update
          question.answers.where.not(id: q[:answers].map{|a| a['id']}.reject { |c| c.blank? }).delete_all

          # Update right answer before wrong answer
          right_answers_params = q[:answers].select {|a| a['correct'] == true}
          wrong_answers_params = q[:answers].select {|a| a['correct'] == false}
          # Update answer
          wrong_answers_params.concat(right_answers_params).each do |a|
            # Update
            question.answers.find(a[:id]).update!(content: a[:content], correct: a[:correct]) if a[:id].present?
            # Create
            question.answers.create!(content: a[:content], correct: a[:correct]) if a[:id].blank?
          end
        end
      end
      render_success({})
    rescue => e
      render_error(e.message)
    end

    def destroy
      topic = Topic.find(params[:id])
      topic.destroy!
      render_success({})
    end

    private
    def topic_params
      params.permit(:name, :description)
    end
  end
end