# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20141204055104) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "audios", force: true do |t|
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "url",        null: false
    t.integer  "piece_id",   null: false
  end

  create_table "follow_units", force: true do |t|
    t.integer  "follower_id", null: false
    t.integer  "followee_id", null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "follow_units", ["follower_id", "followee_id"], name: "index_follow_units_on_follower_id_and_followee_id", using: :btree

  create_table "images", force: true do |t|
    t.string   "url",        null: false
    t.integer  "piece_id",   null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "images", ["url"], name: "index_images_on_url", using: :btree

  create_table "pieces", force: true do |t|
    t.string   "title"
    t.text     "statement"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "media_type", null: false
    t.integer  "user_id",    null: false
  end

  create_table "profiles", force: true do |t|
    t.integer  "user_id",                 null: false
    t.integer  "cover_piece_id"
    t.text     "artist_statement"
    t.text     "collaborative_statement"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "profiles", ["user_id"], name: "index_profiles_on_user_id", using: :btree

  create_table "tag_units", force: true do |t|
    t.integer  "tag_id",     null: false
    t.integer  "piece_id",   null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "tag_units", ["tag_id", "piece_id"], name: "index_tag_units_on_tag_id_and_piece_id", using: :btree

  create_table "tags", force: true do |t|
    t.string   "name",       null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "tags", ["name"], name: "index_tags_on_name", using: :btree

  create_table "users", force: true do |t|
    t.string   "fname",           null: false
    t.string   "lname"
    t.string   "email",           null: false
    t.string   "password_digest", null: false
    t.string   "session_token",   null: false
    t.boolean  "collaborate",     null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "users", ["email"], name: "index_users_on_email", using: :btree
  add_index "users", ["session_token"], name: "index_users_on_session_token", using: :btree

  create_table "videos", force: true do |t|
    t.string   "url",        null: false
    t.integer  "piece_id",   null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "videos", ["url"], name: "index_videos_on_url", using: :btree

end
