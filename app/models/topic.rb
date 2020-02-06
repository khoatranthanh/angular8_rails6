class Topic < ApplicationRecord
  has_many :questions, dependent: :destroy

  validates :name, :description, presence: true
end
