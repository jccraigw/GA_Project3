class Review < ActiveRecord::Base
  self.table_name = 'reviews'
   belongs_to :products
end