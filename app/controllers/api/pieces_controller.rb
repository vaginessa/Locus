module Api
  class PiecesController < ApplicationController
    wrap_parameters :piece, include: [:media, :title, :media_type, :statement, :tags]
    
    def index
      @pieces = filter_index
      @current_user = current_user
      render :index
    end
    
    def show
      @piece = Piece.find(params[:id])
      render json: @piece
    end
    
    
    def create
      @piece = Piece.new(piece_params)
      @piece.user_id = current_user.id
      # createTagUnits(params[:tags])
      if @piece.save!
        render :show
      else
        render json: @piece.errors.full_message, status: :unprocessable
      end
    end
    
    def update
      @piece = Piece.find(params[:id])
      if @piece.update(piece_params)
        render json: @piece
      else
        render json: @piece.errors.full_messages, status: :unprocessable
      end

    end
    
    private
    #
    # def create_tag_units(tag_params)
    #   tag_params.each do |tag_key|
    #     @tag = Tag.new({name: tag})
    #   end
    # end
    
    def piece_params
      params.require(:piece).permit(:title, :statement, :media_type, media: [:url], tags: [:name])
    end
    
    def filter_index
      f = params[:filter]
      if f == 'feed'
        Piece.find_by_sql([
          "SELECT pieces.*
          FROM pieces LEFT OUTER JOIN follow_units ON pieces.user_id = follow_units.followee_id
          WHERE follow_units.follower_id = ? OR pieces.user_id = ? ORDER BY pieces.updated_at DESC",
          current_user.id,
          current_user.id
        ])
      elsif f == 'own'
        Piece.where('user_id= ?', params[:user_id])
      elsif f == 'random'
        #5 random pieces
        #not followed by user
        #also not belonging to user
        pieces = Piece.all - current_user.pieces - current_user.followed_pieces
        pieces.sample(5)
                #
        # Piece.find_by_sql([
        #   "SELECT p.* FROM(
        #         SELECT pieces.*
        #         FROM pieces LEFT OUTER JOIN follow_units ON pieces.user_id = follow_units.followee_id
        #         WHERE follow_units.follower_id != ? OR follow_units.follower_id is NULL
        #         ORDER BY RANDOM()
        #         LIMIT 15
        #   ) AS p
        #   WHERE p.user_id != ?
        #   ORDER BY p.updated_at DESC",
        #   current_user.id,
        #   current_user.id
        # ])
      elsif f == 'search'
        unless params[:tagged] 
          Piece.all
        else
          search_tags = []
          search_tags << params[:tags].strip
          Piece.find_by_sql([
            "SELECT pieces.*
            FROM pieces JOIN tag_units ON pieces.id = tag_units.piece_id JOIN tags ON tags.id = tag_units.tag_id
            WHERE tags.name IN (?)",
            search_tags
          ])
        end
      end
    end
    #
    # def to_sql(tags)
    #   tags.map {|tag| #{tag}'"}
    # end
    
  end
end





