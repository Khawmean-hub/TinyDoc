function buildSemenComponent() {
    $('.ui.dropdown').dropdown()
    $('.ui.accordion').accordion()
}
buildSemenComponent()
// $('.ui.modal')
//     .modal('setting', 'closable', false)
//     .modal('show')
//     ;
$(document).ready(function () {
    // Handle hover on title
    $(document).on('mouseenter', '.menu_group .title', function () {
        $('.menu_settings').css('display', 'none')
        $(this).siblings('.menu_settings').css('display', 'block');
    });

    $(document).on('mouseleave', '.menu_group .title', function () {
        $(this).siblings('.menu_settings').css('display', 'none');
    });

    // Handle hover on setting itself
    $(document).on('mouseenter', '.menu_settings, .item_setting', function () {
        $(this).css('display', 'block');
    });

    $(document).on('mouseleave', '#side_bar_body',function(){
        $('.menu_settings, .item_setting').css('display', 'none')
    })

    // $(document).on('mouseleave', '.menu_settings, .item_setting', function () {
    //     $(this).css('display', 'none');
    // });

    // Handle hover on title
    $(document).on('mouseenter', '.menu_group .item', function () {
        $(this).find('.item_setting').css('display', 'block');
    });

    $(document).on('mouseleave', '.menu_group .item', function () {
        $(this).find('.item_setting').css('display', 'none');
    });


    $(document).on('keydown', function(event) {
        if (event.key === "Escape") {
            $('.modal').modal('hide');
        }
    });
});

$(document).on('click', '.menu_group .content>.menu .item', function () {
    $('.menu_group .content>.menu .item').removeClass('active')
    $(this).addClass('active')
})








//================================================================ Functions ================================================================
/**
 * 
 * @param {*} param0 
 * @returns 
 */
function buildModalOneInput({ title='', label='',value='', btnName='Save', onSave, size='tiny', isRequired=false}) {
    const id = getRandId() + 'onemodal';
    const $modals = $('#modals');

    //html
    const html = `<div class="ui modal ${size}" id="${id}">
                    <form class="ui form">
                    <h4 class="ui header dividing " style="font-size: 16px;padding: 16px;background: #f9fafb;height: 56px;">
                        ${title}
                    </h4>
                    <div class="field ${isRequired ? 'required' : ''}" style="padding: 0 18px;">
                        <label class="pb_5">${label}</label>
                        <input class="topic_title_input" type="text" value="${value}" placeholder="${label}">
                    </div>
                    </form><br>
                    <div class="actions agr">
                    <div class="ui tiny button btn_cancel deny">Cancel</div>
                    <div class="ui button tiny teal btn_on_pop" value="submit">${btnName}</div>
                    </div>
                </div>`

    $modals.append(html);
    let $modal = $('#' + id);
    let $input = $('#' + id + ' input');
    let $btnSave = $('#' + id + ' .btn_on_pop');
    let $btnCancel = $('#' + id + ' .btn_cancel');
    let $field = $('#' + id + ' .field');
    //add events
    $btnSave.click(function(){
        let value = $input.val();

        const close =()=>{$modal.modal('hide')}
        const start =()=>{$btnSave.addClass('loading')}
        const stop =()=>{$btnSave.removeClass('loading')}
        const error =()=>{stop(); $field.addClass('error')}

        if(isRequired && !value){error()}else{$field.removeClass('error')}

        onSave({
            value,
            close,
            start,
            stop,
            error
        })
    })

    $btnCancel.click(function () {
        $modal.modal('hide')
    })

    return $modal;
}

