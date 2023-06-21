'use strict'

const Post = use("App/Models/Post")



//Validator
const { validate } = use('Validator')


class PostController {

    async index({ view }) {
        const postList = await Post.all();


        return view.render("post.index", {
            postList: postList.toJSON()
        })
    }

    async details({ view, params }) {
        const post = await Post.find(params.id)

        return view.render("post.details", {
            post: post
        })
    }

    async newPostForm({ view }) {
        return view.render("post.new_post", {

        })
    }


    async save({ session, request, response }) {

        const validation = await validate(request.all(), {
            title: "required|min:3|max:255",
            description: "required|min:3"
        })

        if (validation.fails()) {
            session.withErrors(validation.messages()).flashAll()
            return response.redirect("back")
        }
        const post = new Post()

        post.title = request.input("title")
        post.description = request.input("description")
        await post.save()

        session.flash({
            alert: "Yeni bloğunuz oluşturuldu..."
        })
        response.redirect("/posts")


    }

    async update({ view, params }) {
        const post = await Post.find(params.id)

        return view.render("post.edit_post", {
            post: post
        })
    }




    async updatePost({ session, request, response, params }) {
        const validation = await validate(request.all(), {
            title: "required|min:3|max:255",
            description: "required|min:3"
        })

        if (validation.fails()) {
            session.withErrors(validation.messages()).flashAll()
            return response.redirect("back")
        }

        const post = await Post.find(params.id)

        post.title = request.input("title")
        post.description = request.input("description")

        await post.save()

        session.flash({
            alert: "Güncelleme işlemi başarılı..."
        })

        response.redirect("/posts")

    }

    async postDelete({ response, params, session }) {
        const post = await Post.find(params.id)
        await post.delete()

        session.flash({
            alert: "Blog başarılı bir şekilde silindi..."
        })

        return response.redirect("/posts")

    }



}

module.exports = PostController
