FactoryGirl.define do
  factory :user do
    trait :student do
      name 'student'
      email 'student@example.com'
      password '12345678'
      role :student
    end
    trait :teacher do
      name 'teacher'
      email 'teacher@example.com'
      password '12345678'
      role :teacher
    end
  end
end