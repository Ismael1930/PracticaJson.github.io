
const getMenu = async () => {
    
    try {
        const response = await fetch('menu.json')
        const data = await response.json()
        
        const menu =  data.map(item => {
            return { 
                title: item.title, 
                subTitles: item?.submenu?.map(item => {
                    return {
                        subtitle: item?.subTitle,
                        pages: item.options.map(item => {
                            return {
                                pageName: item.pageName,
                                link: item.link
                            }
                        })
                    }
                })
            }
        })

        const subtitles = menu.flatMap(menuItem => menuItem.subTitles?.map(subTitleItem => subTitleItem?.subtitle));
        const pagesName = menu.flatMap(menuItem => menuItem.subTitles?.flatMap( subTitleItem => subTitleItem?.pages.map(page => page.pageName)))
        const links = menu.flatMap(menuItem => menuItem.subTitles?.flatMap( subTitleItem => subTitleItem?.pages.map(page => page.link)))

        
        const titleElements = Array.from(document.getElementsByClassName('event-title'))
        const subTitleElements = Array.from(document.getElementsByClassName('subtitle'))
        const optionsElements = Array.from(document.getElementsByClassName('option'))
        
        titleElements.forEach((element,index) => {
            element.textContent = menu[index].title
        })
        subTitleElements.forEach((element,index) => {
            element.textContent = subtitles[index]
        })
        optionsElements.forEach((element,index) => {
            element.href = links[index]
            element.textContent = pagesName[index]
        })

    } catch (error) {
        console.error(error + " no se pudo cargar el archivo")
    }
}

// const getMenu = () =>  {
//     const jsonData = fetch('menu.json')
//     .then(resp => resp.json())
//     .then(data => data)
//     .catch(err => console.error(err + " no se pudo cargar el archivo"))
// }

getMenu()

