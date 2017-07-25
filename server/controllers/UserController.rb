require 'SecureRandom'

class UserController < ApplicationController
  #post request to /users/register
  post '/register' do
    user_details = JSON.parse(request.body.read)
    user = User.new
    user.email = user_details["email"]
    user.password = user_details["password"]
    user.street = user_details["street"]
    user.name = user_details["name"]
    user.street_pt_two = user_details["street_pt_two"]
    user.city = user_details["city"]
    user.state = user_details["state"]
    user.zip = user_details["zip"]
    user.token = SecureRandom.hex
    user.save
    user.to_json
  end

  #post request to /users/login
  post '/login' do
    user_details = JSON.parse(request.body.read)
    user = User.find_by({email: user_details["email"]})
    if user && user.authenticate(user_details["password"])
      user.to_json
    else
     {message: "ACCESS DENIED" }.to_json
    end
  end
end