class Question < ApplicationRecord
  has_many :answers, dependent: :destroy
  belongs_to :topic

  validates :title, :description, presence: true
end
