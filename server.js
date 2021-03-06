if (process.env.NOE_ENV !== 'production') {

  require('dotenv').config()

}





const express = require ('express')
const mongoose = require ('mongoose')
const Article = require ('./models/article')
const articleRouter = require('./routes/articles')
const methodOverride = require('method-override')
const app = express ()
const expressLayouts = require ('express-ejs-layouts')

//mongoose.connect('mongodb://localhost/blog' , { useNewUrlParser: true , useUnifiedTopology: true, useCreateIndex: true  })
mongoose.connect(process.env.DATABASE_URL , { useNewUrlParser: true , useUnifiedTopology: true, useCreateIndex: true  })
const db = mongoose.connection
db.on('error', error => console.error (error) )
db.once('open', () => console.log ('Connected to Mongoose') )


app.set('view engine' , 'ejs')

//additonal by me
app.set('views' , __dirname + '/views')
app.set('layouts' ,  'layout')

app.use(expressLayouts)
app.use(express.static(__dirname + '../public'))

//eof addition

app.use(express.urlencoded({extended: false}))
app.use( methodOverride ('_method'))





app.get('/' , async (req,res) =>{
    
    const articles = await Article.find().sort({createdAt: 'desc' })

    res.render('articles/index', { articles: articles} )
})


app.use('/articles', articleRouter )


//app.listen(5000)
app.listen(process.env.PORT || 5000)

