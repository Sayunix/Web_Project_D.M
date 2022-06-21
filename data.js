const ROLE = {
    ADMIN : 'admin',
    BASIC : 'basic'
}
module.exports ={
    ROLE: ROLE,
    users: [
        {id: 1, name: 'Armin', password: 'armin', role: ROLE.ADMIN},
        {id: 2, name: 'Safa',password: 'safa', role: ROLE.ADMIN},
        {id: 3, name: 'Julia',password: 'julia', role: ROLE.ADMIN},
        {id: 4, name: 'Nico',password:'nico', role: ROLE.ADMIN},
        {id: 5, name: 'Rando',password: '!', role: ROLE.BASIC}
    ]
}