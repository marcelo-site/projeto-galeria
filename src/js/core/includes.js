//Arquivo SASS
import $ from 'jquery'

const loadHtmlSuccessCallbacks = []

export function onLoadHtmlSuccess(callback) 
{
    if(!loadHtmlSuccessCallbacks.includes(callback)){
        loadHtmlSuccessCallbacks.push(callback)
    }
}

function loadIncludes(parent){
    if(!parent) parent = 'body'
    $(parent).find('[wm-includes]').each(function(i, e){
        const url = $(e).attr('wm-includes')
        $.ajax({
            url,
            success(data){
                $(e).html(data)
                $(e).removeAttr('wm-includes')

                loadHtmlSuccessCallbacks.forEach(callback => callback(data))
                loadIncludes(e)
            }
        })
    }) 
    }
    loadIncludes()
