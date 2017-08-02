class User < ActiveRecord::Base
  	self.table_name = 'users'
  	has_secure_password
  	has_many :orders
  	has_many :products, through: :orders
end