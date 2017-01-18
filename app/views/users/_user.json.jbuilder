json.extract! user, :id, :name, :email, :password, :password_confirmation, :mailing_list, :created_at, :updated_at
json.url user_url(user, format: :json)