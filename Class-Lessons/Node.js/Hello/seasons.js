exports.seasonName =(englishName)=>{
    switch(englishName){
        case "spring":
            return "אביב";
        case "summer":
            return "קיץ";
        case "autumn":
            return "סתיו";
        case "winter":
            return "חורף";
        default:
            return "Not Correct Season"
    }
}

exports.holiday = (englishName)=>{
    switch(englishName){
        case 'spring':
            return 'חג פסח';
        case 'summer':
            return 'טו באב';
        case 'autumn':
            return 'סוכות';
        case 'winter':
            return 'חנוכה';
        default:
            return 'תמיר המלך';
    }
}