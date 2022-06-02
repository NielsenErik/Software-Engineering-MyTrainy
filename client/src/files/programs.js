
const cards = [
    {
        title: "Gambe",
        sport: "Sport",
        color: "#EEB523",
        description: "sodjfndjosfndsjfnsdifasidjfwhaibfsivbadihvaihvbashibvdadibhvhdsvidvidvadvaib ",
        day: "giorno di inizio",
        startDate: "start-date",
        endDate: "end-date",
    },
    {
        title: "Petto1",
        sport: "Sport",
        color: "#EEB523",
        description: "sodjfndjosfndsjfnsdifasidjfwhaibfsivbadihvaihvbashibvdadibhvhdsvidvidvadvaib",
        day: "day",
        startDate: "start-date",
        endDate: "end-date",
    },
    {
        title: "Schiena1",
        sport: "Sport",
        color: "#EEB523",
        description: "sodjfndjosfndsjfnsdifasidjfwhaibfsivbadihvaihvbashibvdadibhvhdsvidvidvadvaib",
        day: "day",
        startDate: "start-date",
        endDate: "end-date",
    },
    {
        title: "Corsa",
        sport: "Sport",
        color: "#EEB523",
        description: "sodjfndjosfndsjfnsdifasidjfwhaibfsivbadihvaihvbashibvdadibhvhdsvidvidvadvaib",
        day: "day",
        startDate: "start-date",
        endDate: "end-date",
    }
]

const programs = [
    {
        title: "MyFirstProgram",
        sport: "sport",
        color: "#EEB523",
        description: "I topi non avevano nipoti",
        programCards: [cards[0], cards[1], cards[2], cards[3]],
        // programCards: [
        //     {card: cards[0]},{card: cards[1]},{card: cards[2]},{card: cards[3]},
        // ]
    },
    {
        title: "Atletica",
        sport: "Atletica",
        color: "#EEB523",
        description: "I topi non avevano nipoti ; E la tela letale",
        programCards: [cards[0], cards[1]],
        // programCards: [
        //     {card: cards[0]},{card: cards[1]},
        // ]
    },
    {
        title: "Cardio",
        sport: "Atletica",
        color: "#4FB147",
        description: "Il programma Cardio è impostato in modo da farti bruciare più grassi possibili",
        programCards: [cards[0], cards[2], cards[3]],
        // programCards: [
        //     {card: cards[0]},{card: cards[2]},{card: cards[3]},
        // ]
    }
]



module.exports = {
    programs,
    cards
}