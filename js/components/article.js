//=============================================================== Events =============================================================== 
$(document).on('click', '#editor_save', onSaveArticle)
$(document).on('click', '.article_title_menu', onArticleClick)
$(document).on('click', '.copy_code', onCopyCode)
$(document).on('click', '.btn_article_update_open_modal', openModalUpdateArticle)
$(document).on('click', '.btn_article_delete_confirm', onDeleteArticle)
$(document).on('click', '.copy_link', onCopyLink)
$(document).on('input', '#search_box input', onSearch)
$(document).on('click', '.search_title_res', onSearchResClick)
$(document).on('click', '#magic', doMagic)



//=============================================================== Functions =============================================================== 

/**
 * build ui
 */
function loadSemantic() {
  $('#side_bar_body .ui.dropdown').dropdown()
  $('#side_bar_body .ui.accordion').accordion()
}


function buildArticleTitleHtml(v) {
  return `<a class="item article_title_menu" id="${v.id}">
                  ${v.title}
                  <div class="item_setting">
                    <div class="ui input small">
                      <div class="ui icon right top pointing dropdown">
                        <i class="ellipsis vertical icon grey"></i>
                        <div class="menu">
                          <div class="item btn_article_update_open_modal">
                            <i class="edit icon"></i>Edit
                          </div>
                          <div class="item btn_article_delete_confirm">
                            <i class="trash icon"></i>Delete
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </a>`;
}


//build article
function buildArticleTitle(topicId) {
  let html = '';
  articleRepo.findByTopicId(topicId).forEach(v => {
    html += buildArticleTitleHtml(v)
  })

  //check if empty
  if (articleRepo.findByTopicId(topicId).length === 0) {
    html = buildEmptyTopic()
  }

  return html;
}

/**
 * When no topic
 */
function buildEmptyTopic() {
  return `
   <p class="no_data_here" style="text-align: center;color: #9f9f9f;">No Data</p>
  `;
}

/**
 * Open modal save article
 */
function openModalSaveArticle() {
  window.editorMode = EDITOR_MODE.SAVE;
  $('#editor_mode').text('New Article')
  window.currentTopicId = $(this).parents('.menu_group').attr('id');
  const topic = topicRepo.findByCurrent();
  $('#topic_name_here').html(`${topic.topicName} <i class="angle double right icon"></i>`)
  $('#topic_edit').val('');
  newEditor();
  $('#modal_save_article').modal('setting', 'closable', false).modal('show');
}


/**
 * On click button save
 */
function onSaveArticle() {
  let $editTopic = $('#topic_edit');
  //tile
  const title = $editTopic.val();



  //validation
  if (!title) {
    $editTopic.parent().parent().addClass('error');
    showMessage(VALIDATION_MESSAGE.ARTICLE_NAME_EMPTY, MSG_TYPE.ERROR)
    return;
  } else {
    $editTopic.parent().parent().removeClass('error');
  }

  //get content html from tinymce
  const content = getDataFromEditor();
  let article;

  //check mode
  if (window.editorMode === EDITOR_MODE.SAVE) {
    article = articleRepo.save(title, content)
    const html = buildArticleTitleHtml(article)
    let $articleEle = $('#' + article.topicId);
    $articleEle.find('.no_data_here').remove()
    $articleEle.find('.append_article_title').append(html);
  }
  else {
    article = articleRepo.update(window.currentArticleId, title, content)
    const html = buildArticleTitleHtml(article)
    $('#' + article.id).replaceWith(html);
  }

  //reload
  $('#' + article.id).click()
  loadSemantic()
  //hide modal
  $('#modal_save_article').modal('hide');
}

/**
 * On click on article menu
 */
function onArticleClick() {
  try {
    const articleId = $(this).attr('id');
    const article = articleRepo.findById(articleId);
    let html = '';
    if (article.modifyDate) {
      // Check update article
      html += `<h4 class="ui header" style="display: flex; justify-content: space-between;align-items: center;"><div style="display: flex; align-items: center;">
                <img class="ui circular image profile_update_image" src="${window.user.profile}" alt="img"> </i><div class="content" style="margin-left: 10px; font-family: monospace!important;"> ${article.modifyBy} <div class="sub header" style="font-family: monospace!important;"> Modified: ${article.modifyDate} </div></div></div> <div><div class="ui icon top left pointing dropdown copy_drop">
                <i class="share alternate icon teal"></i>
                <div class="menu">
                  <div class="item copy_link" act_id="${article.id}">Copy link</div>
                </div>
              </div></div></h4> <br>`;
    } else {
      // Check create article
      html += `<h4 class="ui header" style="display: flex; justify-content: space-between;align-items: center;"><div style="display: flex; align-items: center;">
                <img class="ui circular image profile_update_image" src="${window.user.profile}" id="profile_crate_image" alt="img"> </i><div class="content" style="margin-left: 10px; font-family: monospace!important;">  ${article.regBy} <div class="sub header" style="font-family: monospace!important;"> Created: ${article.regDate} </div></div></div> <div><div class="ui icon top left pointing dropdown copy_drop">
                <i class="share alternate icon teal"></i>
                <div class="menu">
                  <div class="item copy_link" act_id="${article.id}">Copy link</div>
                </div>
              </div></div></h4>`;
    }
    html += decodeURIComponent(article.content)
    $('#body_content').empty().html(html);
    $('.copy_drop').dropdown()
    highlightCode();
  } catch (e) {

  }
}

/**
 * Open modal for update
 */
function openModalUpdateArticle() {
  window.editorMode = EDITOR_MODE.UPDATE;
  $('#editor_mode').text('Update Article')
  window.currentArticleId = $(this).parents('.article_title_menu').attr('id')
  window.currentTopicId = $(this).parents('.menu_group').attr('id');
  const topic = topicRepo.findByCurrent();

  //set topic name
  $('#topic_name_here').html(`${topic.topicName} <i class="angle double right icon"></i>`)
  const oldData = articleRepo.findByCurrent();

  $('#topic_edit').val(oldData.title);
  newEditor(decodeURIComponent(oldData.content));
  $('#modal_save_article').modal('setting', 'closable', false).modal('show');
}

/**
 * Delete article by id
 */
function onDeleteArticle() {
  //find id
  const articleId = $(this).parents('.article_title_menu').attr('id');
  window.currentArticleId = articleId

  //confirm
  if (confirm(MESSAGE.MESSAGE_ASK_DELETE_ARTICLE)) {
    articleRepo.delete(articleId);
    $('#' + articleId).remove();
    buildDefaultArticle()
  }
}

/**
 * Build default home page
 */
function buildDefaultArticle() {
  const htmlEle = `<div style="margin: 50px; max-width: 500px;"> <h2 class="ui header" >Welcome to TinyNoted!</h2> <br>
        <h4>Your Ultimate Digital Note-Taking Companion</h4>
        <p style="color: grey">Hello and welcome to TinyNoted, where your ideas, tasks, and inspirations find their perfect home. Whether you're a student, professional, or creative thinker, TinyNoted is designed to help you capture and organize your thoughts effortlessly.</p>
        </div>
        `
  $('#body_content').empty().html(htmlEle);
}

/**
 * Copy link
 */
function onCopyLink() {
  const articleId = $(this).attr('act_id');
  const article = articleRepo.findById(articleId);
  const link = window.location.origin + '/tinynoted/linkView.html?data=' + encodeURIComponent(JSON.stringify(article.content));
  copyToClipboard(link);
}


function highlight(text, term) {
  const regex = new RegExp(`(${term})`, 'gi');
  return text.replace(regex, '<span class="highlight_search">$1</span>');
}

/**
 * Search everything
 */
function onSearch() {
  const searchTerm = $(this).val().toLowerCase();
  let results = '';

  if (searchTerm.length > 1) {

    //list of article in current company id
    const articleList = window.article.filter(a => topicRepo.findByCurrentCompany()?.some(v => v.id === a.topicId))

    articleList.forEach(function (item) {
      const title = item.title.toLowerCase();
      const content = decodeURIComponent(item.content).toLowerCase();
      if (title.includes(searchTerm) || content.includes(searchTerm)) {
        const highlightedTitle = highlight(item.title, searchTerm);
        const highlightedContent = highlight(decodeURIComponent(item.content), searchTerm);
        const topic = topicRepo.findById(item.topicId)
        results += `<div>
                        <h2 class="search_title_res" articleId="${item.id}">${topic.topicName} => ${highlightedTitle}</h2>
                        <div>${highlightedContent}</div>
                    </div>`;
      }
    });

    //empty
    if (!results) { results = '<div id="no_data_result"><h3>No Data</h3><p>No result was found. You can only search article title and article content.</p></div>' }

    //append
    $('#body_content').html(results);
  } else {
    buildDefaultArticle();
  }

  $('.article_title_menu').removeClass('active')
  highlightCode();
}

/**
 * go direct
 */
function onSearchResClick() {
  const articleId = $(this).attr('articleId')
  const article = articleRepo.findById(articleId);
  let $thisArticle;
  try {
    $thisArticle = $('#' + article.topicId);
    $thisArticle.parents('.accordion').accordion('open', $thisArticle.index())
    $('#' + articleId).click()
  } catch (e) {

  }
}

/**
 * Set dynamic height to editor
 */
function setTextareaHeight() {
  const vh = $(window).height(); // Get viewport height
  const desiredHeight = (vh * 1) - 200; // Calculate desired height
  $('#editor1').height(desiredHeight); // Set height of textarea
}



/**
 * Ask AI to generate content
 */
function doMagic() {
  const prompt = $("#prompt").val();
  $("#prompt").val("")
  ask({message:prompt},({text})=>{
    // Create a markdown-it instance
    const md = new markdownit();

    // Parse markdown to HTML
    const htmlContent = md.render(text);
    // Get the active TinyMCE editor
    const editor = tinymce.activeEditor;

    if (editor) {
      // Append the parsed HTML to the editor
      editor.setContent(htmlContent)
      console.log(editor);
    } else {
      console.error("TinyMCE editor not found");
    }
    console.log(htmlContent);
  })
}
