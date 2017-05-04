const express = require('express')

const processes = require('./processes.js')
const router = express.Router()

router.get('/', (req, res) => {
  //  got to welcome page
  res.redirect('/welcome')
})

router.get('/welcome', (req, res) => {
  //  load the welcome page
  res.render('index', {home: 'welcome'})
})

router.post('/welcome', (req, res) => {
  //  redirects to the main game page, retaining the name as a query
  res.redirect('/wouldyourather?name=' + req.body.name)
})

router.get('/wouldyourather/', (req, res) => {
  //  load the main game page
  let options = processes.getOptions()   //  format {option1: 'string', id1: number, option2: 'string', id2: number}

  options.name = req.query.name //  so that this name can be added to the heading and hyperlinks
  options.option1url = `wouldyourather/${options.id1}/${options.id2}/?name=${req.query.name}`
  options.option2url = `wouldyourather/${options.id2}/${options.id1}/?name=${req.query.name}`
  options.rankingurl = `rankings?name=${req.query.name}`
  options.homeurl = '#'

  res.render('game', options)
})

router.get('/wouldyourather/:win/:lose', (req, res) => {
  //  save the win and lose results and reload the game page
  processes.saveChoice(req.params.win, req.params.lose)

  res.redirect('/wouldyourather?name=' + req.query.name)
})

/*router.get('/reload/:op1/:op2', (req, res) => {
  let options = {}

})*/

router.get('/rankings', (req, res) => {
  //  load the rankings page
  let rankings = processes.getRankings()  //  format {table: ['string', 'string', 'string']}

  rankings.name = req.query.name  //  so that this name can be added to the heading and hyperlinks
  rankings.homeurl = `wouldyourather?name=${req.query.name}`

  res.render('ranking', rankings)
})

module.exports = router
