class ReviewController < ApplicationController

	get '/' do
		review = Review.all
		review.to_json		
	end

	get '/:id' do
		id = params[:id]
		review = Review.where(id_products: id)
		review.to_json
	end

	post '/' do
		request_body = JSON.parse(request.body.read)
		review = Review.new
		review.name = request_body["name"]
		review.text = request_body["text"]
		review.id_products = request_body["id_products"]
		id = review.id_products
		review.save
		reviews = Review.where(id_products: id)
		reviews.to_json
	end

	patch '/:id' do
		id = params[:id]
		request_body = JSON.parse(request.body.read)
		review = Review.find(id)
		review.update_attributes(request_body)
		review.save
		Review.all.to_json
	end

	delete '/:id' do
		id = params[:id]
		review = Review.find(id)
		review.destroy
		Review.all.to_json
	end
end