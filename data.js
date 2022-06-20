const ROLE = {
    ADMIN : 'admin',
    BASIC : 'basic'
}
module.exports ={
    ROLE: ROLE,
    users: [
        {id: 1, name: 'Armin', password: 'mein', role: ROLE.ADMIN},
        {id: 2, name: 'Safa',password: 'beidl', role: ROLE.ADMIN},
        {id: 3, name: 'Julia',password: 'brennt', role: ROLE.ADMIN},
        {id: 4, name: 'Nico',password:'hilfe', role: ROLE.ADMIN},
        {id: 5, name: 'Rando',password: '!', role: ROLE.BASIC}
    ]
}