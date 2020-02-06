module Api::V1
  class TestsController < ApiController
    def index
      render_success(ActiveModel::ArraySerializer.new(Topic.order(:id), each_serializer: TopicSerializer))
    end

    def create
      topic = Topic.new(topic_params)
      if topic.save
        render_success({})
        return
      end
      render_error(topic.errors.full_messages.first)
    end

    def show
      topic = Topic.find(params[:id])
      render_success(TopicSerializer.new(topic))
    end

    def update
      topic = Topic.find(params[:id])
      if topic.update(topic_params)
        render_success({})
        return
      end
      render_error(topic.errors.full_messages.first)
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