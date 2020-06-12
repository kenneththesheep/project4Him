class InventoriesController < ApplicationController
  before_action :set_inventory, only: [:show, :edit, :update, :destroy]
before_action :authenticate_user!
skip_before_action :verify_authenticity_token
  # GET /inventories
  # GET /inventories.json
  def index

    if params[:type] == "name"
      if params[:order] =="des"
        @inventories = Inventory.where(user_id: current_user.id).order(name: :desc)

      else
          @inventories = Inventory.where(user_id: current_user.id).order(:name)

    end
  elsif params[:type] == "quantity"
      if params[:order] =="des"
        @inventories = Inventory.where(user_id: current_user.id).order(total_quantity: :desc)

      else
          @inventories = Inventory.where(user_id: current_user.id).order(:total_quantity)

    end

    elsif params[:type] == "zero"

          @inventories = Inventory.where(user_id: current_user.id).where( total_quantity: 0)

        elsif params[:type] == "others"

          @inventories = Inventory.where(user_id: current_user.id).where( category: "others")

        elsif params[:type] == "drinks"

          @inventories = Inventory.where(user_id: current_user.id).where( category: "drinks")

        elsif params[:type] == "food"

          @inventories = Inventory.where(user_id: current_user.id).where( category: "food")

        elsif params[:type] == "clean"

          @inventories = Inventory.where(user_id: current_user.id).where( category: "clean")

      elsif params[:foo] == "searchName"

      @inventories = Inventory.where("name like ?", "%#{params[:productName]}%")

    else
        @inventories = Inventory.where(user_id: current_user.id)
    end
    puts current_user.email
        respond_to do |format|
      format.json {
          render :json => @inventories,
          include: :user
      }

      format.html
    end
  end

  # GET /inventories/1
  # GET /inventories/1.json
  def show
  end

  # GET /inventories/new
  def new
    @inventory = Inventory.new
  end

  # GET /inventories/1/edit
  def edit
  end

  # POST /inventories
  # POST /inventories.json
  def create
    @inventory = Inventory.new(inventory_params)
    @inventory.user = current_user
    respond_to do |format|
      if @inventory.save
        format.html { redirect_to @inventory, notice: 'Inventory was successfully created.' }
        format.json { render :show, status: :created, location: @inventory }
      else
        format.html { render :new }
        format.json { render json: @inventory.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /inventories/1
  # PATCH/PUT /inventories/1.json
  def update
    puts "I am updating yoyoyoyoyoyoyoyoyoyoyoyoyoyo"
    respond_to do |format|
      if @inventory.update(inventory_params)
        puts "Happy Happy HGappy Happy"
        format.html { redirect_to @inventory, notice: 'Inventory was successfully updated.' }
        format.json { render :show, status: :ok, location: @inventory }
      else
        puts "Failre in update civilisation"
        format.html { render :edit }
        format.json { render json: @inventory.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /inventories/1
  # DELETE /inventories/1.json
  def destroy
    @inventory.destroy
    puts params
    respond_to do |format|
      format.html { redirect_to inventories_url, notice: 'Inventory was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_inventory
      @inventory = Inventory.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def inventory_params
      params.require(:inventory).permit(:name, :remarks, :total_quantity, :unsorted_quantity, :sorted_quantity, :image_url, :user_id, :category)
    end
end