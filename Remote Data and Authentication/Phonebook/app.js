function attachEvents() {
    document.getElementById('btnLoad').addEventListener('click', onLoadAllRecords)
    document.getElementById('btnCreate').addEventListener('click', handleCreateRecord)
}

function handleCreateRecord() {
    const personEl = document.getElementById('person')
    const phoneEl = document.getElementById('phone')

    onCreateRecords(personEl.value, phoneEl.value)
    personEl.value = ''
    phoneEl.value = ''
}

function renderRecord(data) {
    const ul = document.getElementById('phonebook')
    ul.innerHTML = ''
    Object.values(data).forEach(rec => {
        const li = document.createElement('li')
        li.textContent = `${rec.person}: ${rec.phone}`
        li.setAttribute('data-id', rec._id)
        const btn = document.createElement('button')
        btn.textContent = 'Delete'
        btn.addEventListener('click', handleDelete)
        li.appendChild(btn)
        ul.appendChild(li)
    })
}

function handleDelete(e) {
    const li = e.target.parentElement
    const id = e.target.parentElement.getAttribute('data-id')

    onDeleteRecord(id)
    li.remove()
}

async function onLoadAllRecords() {
    const url = 'http://localhost:3030/jsonstore/phonebook'
    const res = await fetch(url)
    const data = await res.json()

    return renderRecord(data)
    
}

async function onCreateRecords(person, phone) {
    const url = 'http://localhost:3030/jsonstore/phonebook'
    const body = {
        person,
        phone
    }
    const header = getHeader('POST', body)
    const res = await fetch(url, header)
    const data = await res.json()
    onLoadAllRecords()
    return data
}

async function onDeleteRecord(id) {
    const url = `http://localhost:3030/jsonstore/phonebook/${id}`

    const headers = getHeader('DELETE', null)
    const res = await fetch(url,headers)
    const data = await res.json()
    return data
}

function getHeader(method, body) {
    return {
        method: `${method}`,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    }
}
attachEvents();
