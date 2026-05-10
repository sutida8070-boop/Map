<div id="mapDataSection" class="hidden pt-24 px-4 sm:px-8 max-w-7xl mx-auto pb-10">

    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h2 class="text-2xl font-bold text-gray-800 flex items-center shrink-0">
            <div class="bg-blue-100 p-2 rounded-lg mr-3">
                <i class="fa-solid fa-table-list text-blue-600"></i>
            </div>
            ข้อมูลสถานที่ทั้งหมด
        </h2>

        <div class="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
            <div class="relative w-full sm:w-64">
                <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <i class="fa-solid fa-magnifying-glass text-gray-400"></i>
                </div>
                <input type="text" id="searchInput" oninput="searchData()"
                    class="bg-white border border-gray-300 text-gray-900 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2 shadow-sm transition-all outline-none"
                    placeholder="ค้นหาชื่อ, ที่อยู่, เบอร์โทร...">
            </div>

            <div
                class="flex items-center gap-2 bg-white px-3 py-1.5 rounded-xl shadow-sm border border-gray-200 w-full sm:w-auto justify-between sm:justify-start">
                <label class="text-sm font-medium text-gray-600 whitespace-nowrap">แสดง:</label>
                <select id="rowsPerPage" onchange="updateRowsPerPage()"
                    class="bg-gray-50 border border-gray-300 rounded-lg p-1 text-sm font-medium outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all cursor-pointer">
                    <option value="5">5 แถว</option>
                    <option value="10" selected>10 แถว</option>
                    <option value="50">50 แถว</option>
                    <option value="100">100 แถว</option>
                </select>
            </div>
        </div>
    </div>

    <div class="bg-white rounded-2xl shadow-sm overflow-x-auto border border-gray-200">
        <table class="w-full text-left border-collapse min-w-[900px]">
            <thead>
                <tr class="bg-blue-50 text-blue-800 text-sm border-b border-blue-100">
                    <th class="p-4 font-bold text-center w-16">ลำดับ</th>
                    <th class="p-4 font-bold">ชื่อสถานที่</th>
                    <th class="p-4 font-bold">ที่อยู่</th>
                    <th class="p-4 font-bold w-48">เบอร์โทร</th>
                    <th class="p-4 font-bold w-64">พิกัด (Lat, Lng)</th>
                    <th id="thAction" class="p-4 font-bold text-center w-36 hidden">จัดการ</th>
                </tr>
            </thead>
            <tbody id="mapDataTableBody" class="text-sm text-gray-700 divide-y divide-gray-100">
                <!-- ข้อมูลตารางจะถูกโหลดมาใส่ตรงนี้ -->
            </tbody>
        </table>
    </div>

    <!-- Pagination -->
    <div
        class="flex flex-col sm:flex-row justify-between items-center mt-6 gap-4 bg-white p-4 rounded-2xl shadow-sm border border-gray-200">
        <div class="text-sm text-gray-600 font-medium text-center sm:text-left">
            แสดง <span id="pageInfoStart" class="font-bold text-blue-600">0</span> ถึง <span id="pageInfoEnd"
                class="font-bold text-blue-600">0</span> จากทั้งหมด <span id="pageInfoTotal"
                class="font-bold text-blue-600">0</span> รายการ
        </div>
        <div class="flex items-center gap-2">
            <button onclick="changePage(-1)" id="prevPageBtn"
                class="px-4 py-2 bg-white border border-gray-300 rounded-xl text-gray-600 font-medium hover:bg-gray-50 hover:text-blue-600 disabled:opacity-40 disabled:hover:bg-white disabled:hover:text-gray-600 transition-all shadow-sm">
                <i class="fa-solid fa-chevron-left mr-1"></i> ก่อนหน้า
            </button>
            <div class="px-4 py-2 bg-blue-50 text-blue-700 font-bold rounded-xl border border-blue-100 shadow-inner">
                หน้า <span id="currentPageDisplay">1</span>
            </div>
            <button onclick="changePage(1)" id="nextPageBtn"
                class="px-4 py-2 bg-white border border-gray-300 rounded-xl text-gray-600 font-medium hover:bg-gray-50 hover:text-blue-600 disabled:opacity-40 disabled:hover:bg-white disabled:hover:text-gray-600 transition-all shadow-sm">
                ถัดไป <i class="fa-solid fa-chevron-right ml-1"></i>
            </button>
        </div>
    </div>

</div>

<script>
    let currentPage = 1;
    let rowsPerPage = 10;
    let filteredData = [];
    let searchQuery = '';

    function searchData() {
        searchQuery = document.getElementById('searchInput').value.toLowerCase();
        currentPage = 1;
        renderTable();
    }

    function copyToClipboard(text) {
        navigator.clipboard.writeText(text).then(() => {
            Swal.fire({
                toast: true,
                position: 'top-end',
                icon: 'success',
                title: 'คัดลอกพิกัดแล้ว!',
                showConfirmButton: false,
                timer: 1500
            });
        }).catch(err => {
            console.error('Failed to copy: ', err);
        });
    }

    function renderTable() {
        const thAction = document.getElementById('thAction');
        if (currentUser) {
            thAction.classList.remove('hidden');
        } else {
            thAction.classList.add('hidden');
        }

        const allData = window.mapData || [];
        filteredData = allData.filter(row => {
            if (!searchQuery) return true;

            const name = (row[1] || '').toString().toLowerCase();
            const detail = (row[4] || '').toString().toLowerCase();
            const address = (row[5] || '').toString().toLowerCase();
            const tel = (row[6] || '').toString().toLowerCase();

            return name.includes(searchQuery) || detail.includes(searchQuery) || address.includes(searchQuery) || tel.includes(searchQuery);
        });

        const totalRows = filteredData.length;
        const totalPages = Math.ceil(totalRows / rowsPerPage) || 1;

        if (currentPage > totalPages) currentPage = totalPages;
        if (currentPage < 1) currentPage = 1;

        const startIdx = (currentPage - 1) * rowsPerPage;
        const endIdx = Math.min(startIdx + rowsPerPage, totalRows);

        const tbody = document.getElementById('mapDataTableBody');
        tbody.innerHTML = '';

        const colspanCount = currentUser ? 6 : 5;

        if (totalRows === 0) {
            tbody.innerHTML = `<tr><td colspan="${colspanCount}" class="p-8 text-center text-gray-500 font-medium"><i class="fa-regular fa-folder-open text-3xl mb-2 block text-gray-300"></i> ไม่พบข้อมูลที่ค้นหา</td></tr>`;
        } else {
            for (let i = startIdx; i < endIdx; i++) {
                const row = filteredData[i];
                const originalIndex = window.mapData.findIndex(origRow => origRow === row);

                const lat = parseFloat(row[2]).toFixed(5);
                const lng = parseFloat(row[3]).toFixed(5);
                const coordText = `${lat}, ${lng}`;

                const telRaw = row[6] ? String(row[6]).trim() : '';
                const telClean = telRaw.startsWith("'") ? telRaw.substring(1) : telRaw;

                let telHtml = `<span class="text-gray-400 italic text-xs">ไม่มีข้อมูล</span>`;
                if (telClean) {
                    telHtml = `
            <div class="flex items-center gap-2">
              <span class="text-gray-600 text-sm">${telClean}</span>
              <a href="tel:${telClean}" class="flex items-center justify-center w-7 h-7 bg-green-100 text-green-600 hover:bg-green-500 hover:text-white rounded-md transition-colors shadow-sm cursor-pointer" title="โทรออก">
                <i class="fa-solid fa-phone"></i>
              </a>
            </div>
          `;
                }

                const actionCell = currentUser ? `
          <td class="p-4 align-middle">
            <div class="flex justify-center gap-2">
              <button onclick="editFromTable(${originalIndex})" class="px-3 py-1.5 bg-amber-100 text-amber-700 hover:bg-amber-200 hover:shadow-md font-bold rounded-lg transition-all" title="แก้ไข"><i class="fa-solid fa-pen"></i></button>
              <button onclick="deleteFromTable(${originalIndex})" class="px-3 py-1.5 bg-red-100 text-red-700 hover:bg-red-200 hover:shadow-md font-bold rounded-lg transition-all" title="ลบ"><i class="fa-solid fa-trash"></i></button>
            </div>
          </td>
        ` : '';

                tbody.innerHTML += `
          <tr class="hover:bg-blue-50/50 transition-colors group">
            <td class="p-4 text-center text-gray-500 font-medium">${startIdx + (i - startIdx) + 1}</td>
            <td class="p-4 font-bold text-blue-700 group-hover:text-blue-800 transition-colors">${row[1] || '-'}</td>
            <td class="p-4 text-gray-600 text-sm truncate max-w-[200px]" title="${row[5] || '-'}">${row[5] || '-'}</td>
            <td class="p-4">${telHtml}</td>
            
            <td class="p-4 text-gray-600 text-sm">
              <div class="flex items-center gap-2">
                <span>${coordText}</span>
                
                <!-- ไอคอนคัดลอก -->
                <button onclick="copyToClipboard('${coordText}')" class="flex items-center justify-center w-7 h-7 bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-gray-700 rounded-md transition-colors shadow-sm cursor-pointer" title="คัดลอกพิกัด">
                  <i class="fa-regular fa-copy"></i>
                </button>

                <!-- ไอคอนหมุด (เปลี่ยนมาใช้ fa-map-marker-alt ให้ชัวร์ที่สุด) -->
                <a href="https://www.google.com/maps/search/?api=1&query=${coordText}" target="_blank" class="flex items-center justify-center w-7 h-7 bg-red-100 text-red-500 hover:bg-red-500 hover:text-white rounded-md transition-colors shadow-sm cursor-pointer" title="ดูบน Google Maps">
                  <i class="fa-solid fa-map-marker-alt"></i>
                </a>
              </div>
            </td>
            ${actionCell}
          </tr>
        `;
            }
        }

        document.getElementById('pageInfoStart').innerText = totalRows === 0 ? 0 : startIdx + 1;
        document.getElementById('pageInfoEnd').innerText = endIdx;
        document.getElementById('pageInfoTotal').innerText = totalRows;
        document.getElementById('currentPageDisplay').innerText = currentPage;

        document.getElementById('prevPageBtn').disabled = currentPage === 1;
        document.getElementById('nextPageBtn').disabled = currentPage === totalPages;
    }

    function updateRowsPerPage() {
        rowsPerPage = parseInt(document.getElementById('rowsPerPage').value);
        currentPage = 1;
        renderTable();
    }

    function changePage(step) {
        currentPage += step;
        renderTable();
    }

    function editFromTable(index) {
        switchView('map');
        editPin(index);
    }

    function deleteFromTable(index) {
        editingRowIndex = index + 2;
        deletePin();
    }
</script>
