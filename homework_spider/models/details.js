/**
 * Created by Administrator on 2016/11/18.
 */
"use strict";
var mongoose = require("mongoose"),
    Schema = mongoose.Schema,
    Model = new Schema({
        address: String,
        lat: Number,
        lng: Number,
        community_name: String,
        price: Number,
        community_id: {
            type: 'String',
            index: { unique: true }
        },
        property_type: String,
        age: String,
        property_company: String,
        develop_company: String,
        building_count: String,
        house_count: String
    });

Model.index({
    community_name: 1
});

module.exports = mongoose.model("details", Model);