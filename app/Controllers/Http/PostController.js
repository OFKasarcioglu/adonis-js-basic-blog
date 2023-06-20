'use strict'

class PostController {

    async index({ view }) {
        return view.render("home")
    }

}

module.exports = PostController
