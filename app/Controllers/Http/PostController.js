'use strict'

const Post = use("App/Models/Post")

class PostController {

    async index({ view }) {
        const postList = await Post.all();


        return view.render("post.index", {
            postList: postList.toJSON()
        })
    }

}

module.exports = PostController
