const { Collection } = require('discord.js')

const tribes = new Collection()
tribes.set('xin-xi', {
  name: 'Xin-Xi',
  code: 'x',
  color: 'rgb(238, 30, 24)',
  alias: ['x', 'xin', 'xinxi', 'xin-xi'],
  total: 515,
  raw: 390
})
tribes.set('imperius', {
  name: 'Imperius',
  code: 'i',
  color: 'rgb(8, 110, 223)',
  alias: ['i', 'imp', 'imperius'],
  total: 515,
  raw: 390
})
tribes.set('bardur', {
  name: 'Bardur',
  code: 'b',
  color: 'rgb(5, 0, 29)',
  alias: ['b', 'ba', 'bardur'],
  total: 515,
  raw: 390
})
tribes.set('oumaji', {
  name: 'Oumaji',
  code: 'o',
  color: 'rgb(255, 255, 0)',
  alias: ['o', 'ou', 'oum', 'oumaji'],
  total: 520,
  raw: 295
})
tribes.set('kickoo', {
  name: 'Kickoo',
  code: 'k',
  color: 'rgb(0, 255, 0)',
  alias: ['k', 'kick', 'kickoo'],
  total: 515,
  raw: 390
})
tribes.set('hoodrick', {
  name: 'Hoodrick',
  code: 'h',
  color: 'rgb(153, 102, 0)',
  alias: ['h', 'hood', 'hoodrick'],
  total: 620,
  raw: 495
})
tribes.set('luxidoor', {
  name: 'Luxidoor',
  code: 'l',
  color: 'rgb(171, 59, 214)',
  alias: ['l', 'lux', 'luxidoor'],
  total: 515,
  raw: 390
})
tribes.set('vengir', {
  name: 'Vengir',
  code: 'v',
  color: 'rgb(179, 179, 179)',
  alias: ['v', 'ven', 'vengir'],
  total: 730,
  raw: 605
})
tribes.set('zebasi', {
  name: 'Zebasi',
  code: 'z',
  color: 'rgb(255, 153, 0)',
  alias: ['z', 'zeb', 'zebasi'],
  total: 615,
  raw: 490
})
tribes.set('ai-mo', {
  name: 'Ai-Mo',
  code: 'ai',
  color: 'rgb(100, 212, 212)',
  alias: ['ai', 'aimo', 'ai-mo'],
  total: 615,
  raw: 490
})
tribes.set('quetzali', {
  name: 'Quetzali',
  code: 'q',
  color: 'rgb(128, 0, 128)',
  alias: ['q', 'quetz', 'quetzali'],
  total: 620,
  raw: 496
})
tribes.set('yadakk', {
  name: 'Yadakk',
  code: 'y',
  color: 'rgb(153, 45, 45)',
  alias: ['y', 'yad', 'yaddak', 'yadakk'],
  total: 615,
  raw: 490
})
tribes.set('aquarion', {
  name: 'Aquarion',
  code: 'aq',
  color: 'rgb(248, 118, 118)',
  alias: ['aq', 'aquarion'],
  total: 415,
  raw: 290
})
tribes.set('elyrion', {
  name: 'Elyrion',
  code: 'e',
  color: 'rgb(255, 0, 153)',
  alias: ['e', 'ely', 'elyrion'],
  total: 515,
  raw: 390
})
tribes.set('polaris', {
  name: 'Polaris',
  code: 'p',
  color: 'rgb(189, 161, 127)',
  alias: ['p', 'pol', 'polaris'],
  total: 630,
  raw: 505
})
module.exports.getAllTribes = function() {
  return tribes.array()
}
module.exports.getTribeCode = function(string) {
  if(tribes.has(string)) {
    const tribe = tribes.get(string)
    const { code } = tribe
    return code
  } else if(tribes.some(x => x.alias.some(y => y === string))) {
    const tribe = tribes.find(x => x.alias.some(y => y === string))
    const { code } = tribe
    return code
  } else
    throw 'The tribe isn\'t valid'
}

module.exports.getTribe = function(string) {
  string = string.toLowerCase()
  if(tribes.has(string))
    return tribes.get(string)
  else if(tribes.some(x => x.alias.some(y => y === string)))
    return tribes.find(x => x.alias.some(y => y === string))
  else
    throw 'The tribe isn\'t valid'
}

// -----------------------------------------------------------------------
// -----------------------------------------------------------------------
// -----------------------------------------------------------------------

module.exports.buildTableByTribe = function(tribe, rows) {
  const scores = rows.filter(x => tribe.code === x.tribe)

  scores.unshift({
    tribe: tribe.code,
    turn: -1,
    total: tribe.total,
    raw: tribe.raw,
    deltaRaw: 0,
    deltaVision: 0,
    deltaSeen: 0
  })

  const visionArray = []
  scores.forEach((row, index) => {
    const turn = []
    if(scores[index - 1])
      row.deltaRaw = row.raw - scores[index - 1].raw

    if(scores[index - 1])
      row.deltaVision = row.total - scores[index - 1].total - row.deltaRaw

    row.deltaSeen = (row.deltaVision) / 5
    // Turn  | ΔRaw  | ΔSeen | Pts | Raw
    turn.push(row.turn, row.deltaRaw, row.deltaSeen, row.total, row.raw)
    visionArray.push(turn)
  })

  const data = []

  visionArray.forEach((record, index) => {
    record.forEach((el, j) => {
      if(index === 0)
        data.push([])
      data[j].push(el)
    })
  })

  return data
}

// -----------------------------------------------------------------------
// -----------------------------------------------------------------------
// -----------------------------------------------------------------------

module.exports.buildTraces = function(theseTribes, scores) {
  const tracesArray = new Collection()
  // console.log(scores)

  theseTribes.forEach(tribeArg => {
    const tribe = module.exports.getTribe(tribeArg.tribe)
    const tribeScore = scores.filter(x => tribe.code === x.tribe)

    console.log(tribe.raw)
    tribeScore.unshift({
      tribe: tribe.code,
      turn: -1,
      total: tribe.total,
      raw: tribe.raw,
      deltaRaw: 0,
      deltaVision: 0,
      deltaSeen: 0
    })
    console.log(tribeScore.raw)

    const visionArray = []
    tribeScore.forEach((row, index) => {
      const turn = []
      if(tribeScore[index - 1])
        row.deltaRaw = row.raw - tribeScore[index - 1].raw

      if(tribeScore[index - 1])
        row.deltaVision = row.total - tribeScore[index - 1].total - row.deltaRaw

      row.deltaSeen = (row.deltaVision) / 5
      // Turn  | ΔRaw  | ΔSeen | Pts | Raw
      turn.push(row.turn, row.deltaRaw, row.deltaSeen, row.total, row.raw)
      visionArray.push(turn)
    })

    console.log(tribeScore)

    const xRaw = []
    const yRaw = []
    tribeScore.forEach(x => {
      // console.log(x)
      xRaw.push(x.turn)
      yRaw.push(x.raw)
    })
    const rawTrace = {
      name: `${tribe.code.toUpperCase()} raw`,
      x: xRaw,
      y: yRaw,
      marker: {
        color: tribe.color
      },
      mode: 'markers+text',
      line: {
        dash: 'dot',
        width: 2
      },
      connectgaps: true,
      textposition: 'top center',
      type: 'scatter',
      texttemplate: 'hello'
    }

    tracesArray.set(`${tribe.name} Raw`, rawTrace)

    const xTotal = []
    const yTotal = []
    tribeScore.forEach(x => {
      xTotal.push(x.turn)
      yTotal.push(x.total)
    })
    const visionTrace = {
      name: `${tribe.code.toUpperCase()} vision`,
      x: xTotal,
      y: yTotal,
      marker: {
        color: tribe.color
      },
      mode: 'markers+text',
      connectgaps: true,
      textposition: 'top center',
      type: 'scatter',
      texttemplate: 'hello'
    }

    tracesArray.set(`${tribe.name} Vision`, visionTrace)
  })
  // console.log(tracesArray)
  return tracesArray
}

module.exports.buildTable = function(tribeArray, rows) {
  const raw = rows.filter(x => !x.is_vision)
  const vision = rows.filter(x => x.is_vision)
  const tracesArray = new Collection()

  tribeArray.forEach(tribe => {
    const tribeRaw = raw.filter(x => tribe.tribe === x.tribe)
    const tribeVision = vision.filter(x => tribe.tribe === x.tribe)

    const tribeName = module.exports.getTribe(tribe.tribe)

    const xRaw = []
    const yRaw = []
    tribeRaw.forEach(x => {
      xRaw.push(x.turn)
      yRaw.push(x.total)
    })
    const rawTrace = {
      name: `${tribeName.code.toUpperCase()} raw`,
      x: xRaw,
      y: yRaw,
      marker: {
        color: tribeName.color
      },
      mode: 'markers+text',
      textposition: 'top center',
      type: 'scatter',
      texttemplate: 'hello'
    }

    tracesArray.set(`${tribeName.name} Raw`, rawTrace)

    const xVision = []
    const yVision = []
    tribeVision.forEach(x => {
      xVision.push(x.turn)
      yVision.push(x.total)
    })
    const visionTrace = {
      name: `${tribeName.code.toUpperCase()} vision`,
      x: xVision,
      y: yVision,
      marker: {
        color: tribeName.color
      },
      mode: 'markers+text',
      textposition: 'top center',
      type: 'scatter',
      texttemplate: 'hello'
    }

    tracesArray.set(`${tribeName.name} Vision`, visionTrace)
  })
  return tracesArray
}