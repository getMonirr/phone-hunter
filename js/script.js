// global sector
const phoneContainer = document.getElementById('phone-container');
// get phone data
const getPhoneData = async(clientSearch) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${clientSearch}`);
    const data = await res.json();
    setPhoneData(data.data);
}
// set phone data
const setPhoneData = (data) => {
    // console.log(data);
    phoneContainer.innerHTML = '';
    data.forEach(phone => {
        displayPhoneUI(phone)
    })
}
// display phone data in ui
const displayPhoneUI = (phone) => {
    const {phone_name:name,image,brand} = phone;
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
                    <button class="btn btn-primary">Buy Now</button>
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
document.getElementById('search-btn').addEventListener('click',handleSearch);

// for enter 
searchInput.addEventListener('keypress',(e) => {
    if(e.key === 'Enter'){
        handleSearch();
    }
})
getPhoneData('samsung')