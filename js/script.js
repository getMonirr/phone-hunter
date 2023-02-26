// global sector
const phoneContainer = document.getElementById('phone-container');
// get phone data
const getPhoneData = async (clientSearch) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${clientSearch}`);
    const data = await res.json();
    setPhoneData(data.data);
}
// set phone data
const setPhoneData = (data) => {
    const showAllBtn = document.getElementById('show-all-btn');
    console.log(data);
    phoneContainer.innerHTML = '';
    if (data.length > 10) {
        showAllBtn.classList.remove('hidden')
    } else {
        showAllBtn.classList.add('hidden')

    }
    data.slice(0, 10).forEach(phone => {
        displayPhoneUI(phone)
    })
}
// display phone data in ui
const displayPhoneUI = (phone) => {
    const { phone_name: name, image, brand, slug } = phone;
    const div = document.createElement('div');
    div.innerHTML = `
    <div class="card bg-base-100 shadow-xl p-4">
                <figure><img src="${image}" /></figure>
                <div class="card-body">
                    <h2 class="card-title">
                        ${name}
                        <div class="badge badge-secondary">NEW</div>
                    </h2>
                    <div class="card-actions justify-end">
                        <div class="badge badge-outline">Brand: ${brand}</div>
                    </div>
                    <div class="card-actions">
                    <label onclick="handleDetails('${slug}')" for="my-modal-6" class="btn btn-primary">open modal</label>
                </div>
                </div>
            </div>
    `;
    phoneContainer.appendChild(div);
}

// search handler
const searchInput = document.getElementById('search-input')

const handleSearch = () => {
    clientSearchText = searchInput.value;
    getPhoneData(clientSearchText);
}
// search btn add event listener
document.getElementById('search-btn').addEventListener('click', handleSearch);

// for enter 
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        handleSearch();
    }
})
// get phone details data 
const getPhoneDetails = async (id) => {


}
// handle details
const handleDetails = async (slug) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${slug}`);
    const data = await res.json();
    showDetailsUI(data);
}
/// handle modal
const showDetailsUI = (data) => {
    console.log(data.data);
    const { name, brand, image, releaseDate, mainFeatures
    } = data.data
    const detailsContainer = document.getElementById('detail-container');
    detailsContainer.innerHTML = '';
    const div = document.createElement('div');
    div.innerHTML = `
    <h2> Name: ${name}</h2>
    <img class="mx-auto my-8" src="${image}" />
    <p> Brand Name: ${brand}</p>
    <p> Release Date: ${releaseDate}</p>
    <h3 class="mt-4 font-bold">Sensors: 
            ${mainFeatures.sensors.map(f => `<li class="font-normal text-left">${f}</li>`).join('')
        }
        </h3>
        `;
    detailsContainer.appendChild(div);
}



getPhoneData('iphone');