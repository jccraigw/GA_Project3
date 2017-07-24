class Product < ActiveRecord::Base
  self.table_name = 'products'
  has_many :orders
  has_many :users, through: :orders
end