$inputNewCompany = $('#document_text')
const defaultActive = `<i class="bookmark icon teal default_icon"></i>`;
const defaultDis = `<i class="bookmark outline icon grey btn_set_def"></i>`;

//=============================================================== Events ===============================================================
$(document).on('click', '#btn_add_company', onAddCompany)
$(document).on('click', '.btn_set_def', onSetDefaultCompany)
$(document).on('click', '.btn_edit_company', onEditCompany)
$(document).on('click', '.btn_delete_company', onDeleteCompany)
$(document).on('click', '.btn_cancel_rename', onCancelRename)
$(document).on('click', '.btn_save_rename', onSaveRename)
$(document).on('change', '#company_drop input', onChangeCompany)


//=============================================================== function ===============================================================

//Build Company Dropdown
function buildCompany() {
    //id
    const $comDrop = $('#company_drop');

    //defined list
    let dropList = [];

    //make data
    companyRepo.findAll().forEach(e => {
        const obj = {
            name: e.companyName,
            value: e.id,
            selected: e.id === getDefaultCompanyId()
        };
        dropList.push(obj);
    });

    //on change
    // function onChangeCompany(id, text) {

    // }

    //set dropdown
    $comDrop.dropdown({
        values: dropList,
        showOnFocus: false
    });

    //set event
    // $comDrop.dropdown(
    //     "setting",
    //     "onChange", onChangeCompany
    // );

    //remove loading
    $comDrop.removeClass("loading");
    //build menu sidebar topic
    buildTopic();
}

/**
 * Event on change on dropdown
 */
function onChangeCompany() {
    window.currentCompanyId = $(this).val();
    buildTopic();
}

/**
 * Get default company id
 * @returns String
 */
function getDefaultCompanyId() {
    let id = companyRepo.findAll().find(v => v.isDefault === true)?.id
    if (id) {
        return id;
    } else {
        return companyRepo.findAll()[0].id;
    }
}

//<!-- transparent -->
/**
 * Build to table
 */
function buildCompanyTable() {
    let html = '';
    window.company.forEach((e, i) => {
        html += `
          <tr id="${e.id}">
            <td>${i + 1}</td>
            <td>
              <div class="ui input action transparent"> 
                <input type="text" value="${e.companyName}" placeholder="Name" readonly>
                <div class="circular ui icon button doc_rename btn_cancel_rename" company_name="${e.companyName}" style="display: none"><i class="times circle icon"></i></div>
                <div class="circular ui icon button doc_rename teal btn_save_rename" style="display: none"><i class="check circle icon"></i></div>
              </div>
            </td>
            <td>
              <div class="company_actions">
                ${
                 e.isDefault ? defaultActive : defaultDis
                }
                <i class="edit icon yellow btn_edit_company"></i>
                <i class="trash icon red btn_delete_company"></i>
              </div>
             </td>
          </tr>
        `
    });
    $('#company_list tbody').html(html)
}

/**
 * validation before add new company or new document
 * @param {Function} callback 
 */
function onAddCompanyValidation(callback) {
    if (!$inputNewCompany.val()) {
        $inputNewCompany.parent().parent().addClass('error')
    } else {
        $inputNewCompany.parent().parent().removeClass('error')
        callback()
    }
}

/**
 * ON Add new company or new document
 */
function onAddCompany() {

    //validation
    onAddCompanyValidation(() => {
        //save
        companyRepo.save($inputNewCompany.val());
        //rebuild
        buildCompanyTable();
        buildCompany()
        $inputNewCompany.val('')
    })
}

/**
 * On Set default company or document
 */
function onSetDefaultCompany() {
    const id = $(this).parents('tr').attr('id');
    $('.default_icon').replaceWith(defaultDis)
    $(this).replaceWith(defaultActive)
    companyRepo.setDefault(id);
}

/**
 * Close rename mode
 */
function closeEditMode(){
    let $input = $('#company_list tbody input');
    $input.attr('readonly', 'readonly')
    $input.parent().addClass('transparent')
    $('#company_list tbody .doc_rename').hide();
}

function onEditCompany() {

    //close other 
    closeEditMode()

    let $input = $(this).parents('tr').find('input');
    $input.removeAttr('readonly');
    $input.parent().removeClass('transparent')
    $input.parent().find('.doc_rename').show();
    $input.focus()
}

function onDeleteCompany() {
    const id = $(this).parents('tr').attr('id')
    if(confirm(MESSAGE.MESSAGE_ASK_DELETE_COMPANY)){
        companyRepo.delete(id)
        buildCompanyTable();
        buildCompany()
    }
}

/**
 * Rollback
 */
function onCancelRename() {
    //close edit mode
    closeEditMode();

    //change to the old name
    const oldName = $(this).attr('company_name')
    $(this).parents('tr').find('input').val(oldName)
    $(this).parents('tr').find('input').parent().removeClass('error')
}

/**
 * Update or rename company or document
 */
function onSaveRename() {
    const id = $(this).parents('tr').attr('id')
    const newName = $(this).parents('tr').find('input').val()
    if(newName){
        companyRepo.update(id, newName)
        closeEditMode();
        buildCompany();

        //set attribute cancel to the new name
        $(this).parents('tr').find('.btn_cancel_rename').attr('company_name', newName)
        //remove error
        $(this).parents('tr').find('input').parent().removeClass('error')
    }else{
        $(this).parents('tr').find('input').parent().addClass('error')
        showMessage(VALIDATION_MESSAGE.COMPANY_NAME_EMPTY, MSG_TYPE.ERROR)
    }
}