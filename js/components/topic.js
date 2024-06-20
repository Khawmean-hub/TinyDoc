//=============================================================== Event ===============================================================
$(document).on('click', '#btn_new_topic', openModalSaveTopic) //new topic
$(document).on('click', '.btn_edit_topic', openModalUpdateTopic) //update topic
$(document).on('click', '.btn_delete_topic', deleteTopic)
$(document).on('click', '.btn_open_modal_save_article', openModalSaveArticle)
$(document).on('keypress', '.topic_title_input', onEnterKeyTopicTitle);



//=============================================================== function ===============================================================

/**
 * HTML
 * @param {Array} v
 * @returns string
 */
function buildTopicHtml(v) {
    return `<div class="menu_group" id="${v.id}">
                <div class="menu_settings">
                <div class="ui input mini">
                    <div class="ui icon right top pointing dropdown">
                    <i class="ellipsis vertical icon grey"></i>
                    <div class="menu">
                        <div class="item btn_open_modal_save_article">
                        <i class="plus circle icon"></i>Add
                        </div>
                        <div class="item btn_edit_topic">
                        <i class="edit icon"></i>Edit
                        </div>
                        <div class="item btn_delete_topic">
                        <i class="trash icon"></i>Delete
                        </div>
                    </div>
                    </div>
                </div>
                </div>
                <div class="title">
                <i class="dropdown icon"></i>
                <label>${v.topicName}</label>
                </div>
                <div class="content">
                <div class="ui secondary vertical menu append_article_title">
                    ${buildArticleTitle(v.id)}
                </div>
                </div>
          </div>`;
}


/**
 * Build Topic
 */
function buildTopic() {
    let $sideBar = $('#side_bar_body')
    $sideBar.empty();
    const topicList = topicRepo.findByCurrentCompany();
    topicList.forEach(v => {
        $sideBar.append(buildTopicHtml(v))
    })

    if (topicList.length === 0) {
        $sideBar.append(buildEmptyTopic())
    }

    loadSemantic()
    buildDefaultArticle()
}

/**
 * Open Modal for add new topic form
 */
function openModalSaveTopic() {
    //function
    function onSaveTopic({ value, close, start }) {
        if (value) {
            start()
            saveTopic(value)
            close()
        }
    }

    //build modal
    buildModalOneInput({
        title: 'New Topic',
        label: 'Please enter topic name',
        size: 'mini',
        isRequired: true,
        onSave: onSaveTopic
    })
        .modal('setting', 'closable', false)
        .modal('show');
}

/**
 * Opened modal for update topic form
 */
function openModalUpdateTopic() {
    const topicName = $(this).parents('.menu_group').find('.title label').text();
    const topicId = $(this).parents('.menu_group').attr('id')
    function onClick({ value, close, start }) {
        if (value) {
            start()
            updateTopic(topicId, value)
            close()
        }
    }

    //build modal
    buildModalOneInput({
        title: 'Update Topic',
        label: 'Please enter topic name',
        size: 'mini',
        value: topicName,
        isRequired: true,
        btnName: 'Update',
        onSave: onClick
    })
        .modal('setting', 'closable', false)
        .modal('show');
}


/**
 * Add new topic to date
 * @param {string} name 
 */
function saveTopic(name) {
    const saveDate = topicRepo.save(name);
    $('#side_bar_body>.no_data_here').remove()
    $('#side_bar_body').append(buildTopicHtml(saveDate))
    loadSemantic()
}

/**
 * update topic
 * @param {String} id 
 * @param {String} topicName 
 */
function updateTopic(id, topicName) {
    topicRepo.update(id, topicName);
    $('#' + id).find('.title label').text(topicName);
}

/**
 * Delete topic by id
 */
function deleteTopic() {
    const topicId = $(this).parents('.menu_group').attr('id')
    let $sideBarBody = $('#side_bar_body');
    if (confirm(MESSAGE.MESSAGE_ASK_DELETE_TOPIC)) {
        topicRepo.delete(topicId);
        $('#' + topicId).remove();
        if (!$sideBarBody.html()) {
            $sideBarBody.append(buildEmptyTopic())
        }
    }
}

function onEnterKeyTopicTitle(e) {
    if (e.which === 13) {
        $(this).parents('.modal').find('.btn_on_pop').click()
    }
}