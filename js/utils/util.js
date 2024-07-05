//=============================== Global Variable ===============================
const EDITOR_MODE= {
    SAVE: 'Save',
    UPDATE: 'Update',
    ISLOADING: false
}


// Code color highlight using https://highlightjs.org/
function highlightCode() {
    document.querySelectorAll('pre code').forEach((el) => {
        hljs.highlightElement(el);
    });
    $('pre code').append('<i class="copy outline icon copy_code"></i>')
    $('#body_content table').addClass('ui compact table')
    
}

/**
 * Random number
 * @returns number
 */
function getRandId() {
    return Math.floor(Math.random() * (100000000 - 100000 + 1) + 100000) // Generate ID for modal
}

/**
 * date with format
 * @returns String
 */
function getCurrentDate() {
    return moment().format('DD-MM-yyyy');
}

/**
 * get item from localstorage
 * @param {String} item 
 * @returns Array
 */
function getFromStorage(item) {
    const strSess = localStorage.getItem(item);
    if (strSess) {
        return JSON.parse(strSess)
    } else {
        return onSessionNull(item);
    }
}

/**
 * return with default
 * @param {String} item 
 */
function onSessionNull(item) {
    switch (item) {
        case COMPANY_SESSION_NM:
            const defaultData = [{
                companyName: 'Your Docs',
                id: 'company' + getRandId(),
                isDefault: true
            }];
            saveToStorage(COMPANY_SESSION_NM, defaultData);
            return defaultData;
        case TOPIC_SESSION_NM:
            saveToStorage(TOPIC_SESSION_NM, []);
            return [];
        case ARCTICLE_SESSION_NM:
            saveToStorage(ARCTICLE_SESSION_NM, []);
            return [];
        case USER_SESSION_NM:
            const defUser = {
                username: 'Naruto Uzumaki',
                password: '',
                profile: 'https://saeedgatson.com/wp-content/uploads/2016/12/NarutoSageMode.png'
            }
            saveToStorage(USER_SESSION_NM, defUser)
            return defUser;
        default:
            console.log('No session');
            break;
    }
}

/**
 * save data to localstorage
 * @param {String} item 
 * @param {*[]} data
 */
function saveToStorage(item, data) {
    localStorage.setItem(item, JSON.stringify(data));
}

const languages = [

    {text: 'C', value: 'c'},
    {text: 'C#', value: 'csharp'},
    {text: 'C++', value: 'cpp'},
    {text: 'CSS', value: 'css'},
    {text: 'F#', value: 'fsharp'},
    {text: 'Java', value: 'java'},
    {text: 'HTML/XML', value: 'html'},
    {text: 'JavaScript', value: 'javascript'},
    {text: 'Json', value: 'json'},
    {text: 'LESS', value: 'less'},
    {text: 'PHP', value: 'php'},
    {text: 'Python', value: 'python'},
    {text: 'Ruby', value: 'ruby'},
    {text: 'SASS', value: 'scss'},
    {text: 'SQL', value: 'sql'},
    {text: 'TypeScript', value: 'typescript'}
];


/**
 * create tiny editor
 * @param {String} str 
 */
function newEditor(str = '') {
    tinymce.remove("#editor1");
    tinymce.init({
        selector: "#editor1",
        plugins: "anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount",
        toolbar: "fontfamily fontsize | bold italic underline strikethrough | align lineheight | numlist bullist indent outdent | link image media table | emoticons charmap | removeformat | generateAIContent",
        setup: function (editor) {
            editor.ui.registry.addButton('generateAIContent', {
                text : 'Generate AI Content',
                onAction : function () {
                    ask({message:null,random:'true'}, ({text}) => {
                        const md = new markdownit();
                        const htmlContent = md.render(text);
                        const editor = tinymce.activeEditor;
                        if (editor) {
                            editor.setContent(htmlContent)
                        };
                    })
                }
            });
        },
        init_instance_callback: function (inst) {
            inst.setContent(str);
        },
        codesample_languages: languages,
        //skin: 'oxide-dark',
        //language: 'ko_KR',
    });
}



/**
 * get html data from tiny editor
 * @returns String
 */
function getDataFromEditor(){
    return encodeURIComponent(tinymce.get('editor1').getContent());
}


/**
 * Copy code to clipboard
 */
function onCopyCode(){
    const codeValue = $(this).parent().text();
    copyToClipboard(codeValue);
}

/**
 * Copy to clipboard
 * @param {String} str 
 */
function copyToClipboard(str){
    const $temp = $("<textarea>");
    // Append the temporary text area element to the body
    $("body").append($temp);
    // Set the value of the temporary text area to the text to be copied
    $temp.val(str).select();
    // Execute the copy command
    document.execCommand("copy");
    $temp.remove();
    showMessage("Text copied to clipboard!");
}