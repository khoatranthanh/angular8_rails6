FactoryGirl.define do
  factory :answer do
    content 'Option 1'
    question_id 1
    trait :correct do
      correct true
    end
    trait :uncorrect do
      correct false
    end
  end
end