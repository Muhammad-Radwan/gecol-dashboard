export function  codeToHistoryState(code:number) {
    let state: string = "hello"

    switch(code){
        case 0:
            state = "تم التركيب"
            break;
        case 1:
            state = "ربط مباشر للعداد"
            break;
        case 2:
            state = "العداد عاطل أو محروق"
            break;
        case 3:
            state = "تركيبة غير مطابقة للمواصفات"
            break;
        case 4:
            state = "توصيلة عكسية"
            break;
        case 5:
            state = "يوجد اختلاس"
            break;
        case 6:
            state = "لم يتم تركيب العداد لوجود عوائق"
            break;
        case 7:
            state = "غير محمل"
            break;
        case 8:
            state = "مشكلة في الاتصال"
            break;
        default:
            state = "غير معروف"
    }

    return state
}