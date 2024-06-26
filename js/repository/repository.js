const COMPANY_SESSION_NM    = 'tinynoteddatacompany';
const TOPIC_SESSION_NM      = 'tinynoteddatatopic';
const ARCTICLE_SESSION_NM   = 'tinynoteddataarcticle';
const USER_SESSION_NM       = 'tinynoteddatauser';



//======================================== global ========================================
/** company Repository
 * 
 *  findAll
    save
    saveAll
    update
    updateAll
    setDefault
    delete
    deleteAll
 */
let companyRepo = {}

/** topic Repository
 * 
 *  findAll
    save
    saveAll
    update
    updateAll
    delete
    deleteAll
    findByCompanyId
    findByCurrentCompany
    findById
    findByCurrent
 */
let topicRepo = {}


/**article Repository
 * 
 *  findAll
    save
    saveAll
    updateAll
    update
    delete
    deleteAll
    findByTopicId
    findByCurrentTopic
    findById
    findByCurrent
 */
let articleRepo = {}

/**user Repository
 * 
 *  findOne
    update
    updateProfile
    updateUsername
 */
let userRepo = {}


//======================================== COMPANY or Document ========================================

/**
 * list all companies
 * @returns Array
 */
companyRepo.findAll = ()=> {
    return getFromStorage(COMPANY_SESSION_NM);
}


/**
 * Save new company
 */
companyRepo.save = (companyName) => {
    const company = {
        companyName: companyName,
        id: 'company' + getRandId(),
        isDefault: false
    }
    window.company.push(company);
    saveToStorage(COMPANY_SESSION_NM, window.company);
}

/**
 * Save all company
 * @param {Array} companies 
 */
companyRepo.saveAll = (companies) => {
    window.company = [...window.company, ...companies]
    saveToStorage(COMPANY_SESSION_NM, window.company);
}

/**
 * update company
 * @param {String} id 
 * @param {String} companyName 
 */
companyRepo.update = (id, companyName) => {
    window.company.find(v => v.id == id).companyName = companyName;
    saveToStorage(COMPANY_SESSION_NM, window.company)
}

/**
 * Update all companies
 * @param {Array} companies 
 */
companyRepo.updateAll = (companies) => {
    window.company = window.company.map(v=> {
        if(companies.some(a=> a.id === v.id)){
            return companies.find(a=> a.id === v.id)
        }else{
            return v;
        }
    })
    saveToStorage(COMPANY_SESSION_NM, window.company)
}

/**
 * Set default company
 * @param {String} id 
 */
companyRepo.setDefault = (id) => {
    window.company.map(v => {
        if(v.id == id){
            v.isDefault = true;
        }else{
            v.isDefault = false;
        }
        return v;
    })
    saveToStorage(COMPANY_SESSION_NM, window.company)
}

/**
 * delete company
 * @param {String} id 
 */
companyRepo.delete = (id) => {
    if (window.company.length > 1) {
        window.company = window.company.filter(v => v.id != id);
    } else {
        showMyMessage(VALIDATION_MESSAGE.COMPANY_CANNOT_DELETE)
    }
    saveToStorage(COMPANY_SESSION_NM, window.company)
    //remove child of company
    deleteAllByCompanyId(id);
}

/**
 * Delete All companies
 */
companyRepo.deleteAll = () => {
    window.company = [{
        companyName: 'Your Docs',
        id: 'company' + getRandId(),
        isDefault: true
    }];;
    saveToStorage(COMPANY_SESSION_NM, window.company);
}


//======================================== TOPIC ========================================
/**
 * get all topics
 * @returns Array
 */
topicRepo.findAll = () => {
    return getFromStorage(TOPIC_SESSION_NM);
}

/**
 * get all with company id
 * @param {String} companyId 
 * @returns 
 */
topicRepo.findByCompanyId = (companyId) => {
    return window.topic.filter(v => v.companyId == companyId);
}

/**
 * get all with current company id
 * @returns Array
 */
topicRepo.findByCurrentCompany = () => {
    return window.topic.filter(v => v.companyId == window.currentCompanyId);
}

/**
 * find one by id
 * @param {String} id 
 * @returns Object
 */
topicRepo.findById = (id) => {
    return window.topic.find(v => v.id == id);
}

/**
 * find one by current
 * @returns Object
 */
topicRepo.findByCurrent = () => {
    return window.topic.find(v => v.id == window.currentTopicId);
}

/**
 * save new topic
 * @param {String} topicName 
 * @returns Object
 */
topicRepo.save = (topicName) => {
    const topic = {
        topicName: topicName,
        companyId: window.currentCompanyId,
        regDate: getCurrentDate(),
        regBy: window.user.username,
        id: 'topic' + getRandId()
    }
    window.topic.push(topic);
    saveToStorage(TOPIC_SESSION_NM, window.topic);
    showMyMessage(MESSAGE.SAVE_TOPIC_SUCCESS);
    return topic;
}

/**
 * Save all topics
 * @param {Array} topics 
 */
topicRepo.saveAll = (topics) => {
    window.topic = [...window.topic, ...topics]
    saveToStorage(TOPIC_SESSION_NM, window.topic);
}

/**
 * Update topic
 * @param {String} id 
 * @param {String} topicName 
 * @returns 
 */
topicRepo.update = (id, topicName) => {
    window.topic.map(v => {
        if (v.id == id) {
            v.topicName = topicName;
            v.modifyDate = getCurrentDate()
            v.modifyBy = window.user.username;
        }
        return v;
    });
    saveToStorage(TOPIC_SESSION_NM, window.topic);
    showMyMessage(MESSAGE.UPDATE_TOPIC_SUCCESS);
    return window.topic.find(v => v.id == id);
}

/**
 * Update All topic
 * @param {Array} topics 
 */
topicRepo.updateAll = (topics) => {
    window.topic = window.topic.map(v=> {
        if(topics.some(a=> a.id === v.id)){
            return topics.find(a=> a.id === v.id)
        }else{
            return v;
        }
    })
    saveToStorage(TOPIC_SESSION_NM, window.topic)
}

/**
 * delete topic
 * @param {String} id 
 */
topicRepo.delete = (id) => {
    window.topic = window.topic.filter(v => v.id != id);
    saveToStorage(TOPIC_SESSION_NM, window.topic)
    deleteAllByTopicId(id);
    showMyMessage(MESSAGE.DELETE_TOPIC_SUCCESS);
}

/**
 * Delete all topics
 */
topicRepo.deleteAll = () => {
    window.topic = []
    saveToStorage(TOPIC_SESSION_NM, window.topic)
}

/**
 * Delete All by companyId
 * @param {String} id 
 */
function deleteAllByCompanyId(id) {
    window.topic = window.topic.filter(v => v.companyId != id);
    saveToStorage(TOPIC_SESSION_NM, window.topic)
    //remove empty topic article
    window.article = window.article.filter(v => window.topic.some(a=> a.id === v.topicId));
    saveToStorage(ARCTICLE_SESSION_NM, window.article)
}

//======================================== ARTICLE ========================================
/**
 * get all article
 * @returns Array
 */
articleRepo.findAll = () => {
    return getFromStorage(ARCTICLE_SESSION_NM);
}

/**
 * get all with topic id
 * @param {String} topicId 
 * @returns Array
 */
articleRepo.findByTopicId = (id) => {
    return window.article.filter(v => v.topicId == id);
}

/**
 * get all with current topic id
 * @returns Array
 */
articleRepo.findByCurrentTopic = () => {
    return window.article.filter(v => v.topicId == window.currentTopicId);
}

/**
 * find one by id
 * @param {String} id 
 * @returns Object
 */
articleRepo.findById = (id) => {
    return window.article.find(v => v.id == id);
}

/**
 * find one by current
 * @returns Object
 */
articleRepo.findByCurrent = () => {
    return window.article.find(v => v.id == window.currentArticleId);
}

/**
 * save new article
 * @param {String} title 
 * @param {String} content
 * @returns Object
 */
articleRepo.save = (title, content) => {
    const article = {
        title: title,
        content: content,
        regDate: getCurrentDate(),
        regBy: window.user.username,
        id: 'article' + getRandId(),
        topicId: window.currentTopicId
    }
    window.article.push(article);
    saveToStorage(ARCTICLE_SESSION_NM, window.article);
    showMyMessage(MESSAGE.SAVE_ARTICLE_SUCCESS);
    return article;
}

/**
 * Save all new article
 * @param {Array} articles 
 */
articleRepo.saveAll = (articles) => {
    window.article = [...window.article, ...articles]
    saveToStorage(ARCTICLE_SESSION_NM, window.article);
}

/**
 * Update article
 * @param {String} id 
 * @param {String} title
 * @param {String} article
 * @returns Object
 */
articleRepo.update = (id, title, content) => {
    window.article.map(v => {
        if (v.id == id) {
            v.title = title;
            v.content = content;
            v.modifyDate = getCurrentDate()
            v.modifyBy = window.user.username;
        }
        return v;
    });
    saveToStorage(ARCTICLE_SESSION_NM, window.article);
    showMyMessage(MESSAGE.UPDATE_ARTICLE_SUCCESS);
    return window.article.find(v => v.id == id);
}

/**
 * Update all article
 * @param {Array} articles 
 */
articleRepo.updateAll = (articles) => {
    window.article = window.article.map(v=> {
        if(articles.some(a=> a.id === v.id)){
            return articles.find(a=> a.id === v.id)
        }else{
            return v;
        }
    })
    saveToStorage(ARCTICLE_SESSION_NM, window.article);
}

/**
 * Delete by id
 * @param {String} id 
 */
articleRepo.delete = (id) => {
    window.article = window.article.filter(v => v.id != id);
    saveToStorage(ARCTICLE_SESSION_NM, window.article)
    showMyMessage(MESSAGE.DELETE_ARTICLE_SUCCESS);
}

/**
 * Delete all article
 */
articleRepo.deleteAll = () => {
    window.article = []
    saveToStorage(ARCTICLE_SESSION_NM, window.article)
}

/**
 * Delete all by topic id
 * @param {String} id 
 */
function deleteAllByTopicId(id) {
    window.article = window.article.filter(v => v.topicId != id);
    saveToStorage(ARCTICLE_SESSION_NM, window.article)
}

//======================================== ARTICLE ========================================
/**
 * get only one user
 * @returns Object
 */
userRepo.findOne = () => {
    return getFromStorage(USER_SESSION_NM)
}

userRepo.update = (username, profile, password) => {
    if (username) {
        window.user.username = username;
        window.user.password = password;
        window.user.profile  = profile;
        saveToStorage(USER_SESSION_NM, window.user);
        showMyMessage(MESSAGE.UPDATE_USER_SUCCESS);
    } else {
        showMessage(VALIDATION_MESSAGE.USERNAME_REQUIRED, MSG_TYPE.ERROR);
    }
}

/**
 * profile
 * @param {String} str 
 */
userRepo.updateProfile = (str) => {
    if (str) {
        window.user.profile = str;
        saveToStorage(USER_SESSION_NM, window.user);
        showMyMessage(MESSAGE.UPDATE_PROFILE_SUCCESS);
    } else {
        showMyMessage(VALIDATION_MESSAGE.PROFILE_REQUIRED);
    }
}

/**
 * update username
 * @param {String} str 
 */
userRepo.updateUsername = (str) => {
    if (str) {
        window.user.username = str;
        saveToStorage(USER_SESSION_NM, window.user);
        showMyMessage(MESSAGE.UPDATE_USERNAME_SUCCESS);
    } else {
        showMyMessage(VALIDATION_MESSAGE.USERNAME_REQUIRED);
    }
}