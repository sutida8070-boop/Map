<div id="staffViewSection" class="hidden pt-24 px-4 sm:px-8 max-w-5xl mx-auto pb-10">

    <div class="flex justify-between items-center mb-6">
        <h2 class="text-xl sm:text-2xl font-bold text-gray-800 flex items-center">
            <div class="bg-blue-100 p-2 rounded-lg mr-3">
                <i class="fa-solid fa-users-gear text-blue-600"></i>
            </div>
            จัดการข้อมูลผู้ดูแลระบบ
        </h2>

        <button id="addStaffBtn" onclick="openStaffModal()"
            class="hidden px-3 py-2 sm:px-4 sm:py-2 bg-blue-600 text-white text-sm sm:text-base font-bold rounded-xl shadow-md shadow-blue-200 hover:bg-blue-700 transition-all flex items-center shrink-0">
            <i class="fa-solid fa-user-plus sm:mr-2"></i><span class="hidden sm:inline">เพิ่มผู้ดูแล</span>
        </button>
    </div>

    <div id="staffContent">
        <div id="staffLoginPrompt"
            class="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 sm:p-12 text-center">
            <i class="fa-solid fa-lock text-5xl text-gray-300 mb-4 block"></i>
            <h3 class="text-lg font-bold text-gray-700 mb-2">กรุณาเข้าสู่ระบบ</h3>
            <p class="text-gray-500 text-sm">คุณต้องเข้าสู่ระบบก่อนจึงจะสามารถดูข้อมูลผู้ดูแลได้</p>
        </div>

        <!-- เพิ่ม overflow-x-auto ตรงนี้เพื่อให้ตารางเลื่อนซ้ายขวาได้บนมือถือ -->
        <div id="staffTableContainer"
            class="hidden bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden w-full">
            <div class="overflow-x-auto">
                <table class="w-full text-left border-collapse min-w-[700px]">
                    <!-- กำหนด min-w เพื่อไม่ให้คอลัมน์บีบตัวจนพัง -->
                    <thead>
                        <tr class="bg-blue-50 text-blue-800 text-xs sm:text-sm border-b border-blue-100">
                            <th class="p-3 sm:p-4 font-bold text-center w-12 sm:w-16">ID</th>
                            <th class="p-3 sm:p-4 font-bold">ชื่อ - นามสกุล</th>
                            <th class="p-3 sm:p-4 font-bold">ชื่อผู้ใช้ (Username)</th>
                            <th class="p-3 sm:p-4 font-bold text-center w-28 sm:w-32">ระดับสิทธิ์</th>
                            <th id="staffThAction" class="p-3 sm:p-4 font-bold text-center w-24 sm:w-32 hidden">จัดการ
                            </th>
                        </tr>
                    </thead>
                    <tbody id="staffTableBody" class="text-xs sm:text-sm text-gray-700 divide-y divide-gray-100">
                        <!-- ข้อมูล Staff จะมาแทรกตรงนี้ -->
                    </tbody>
                </table>
            </div>
        </div>
    </div>

    <div id="staffModal"
        class="hidden fixed inset-0 bg-black/50 z-[1000] flex justify-center items-center backdrop-blur-sm transition-all p-4">
        <div class="bg-white w-full max-w-md rounded-2xl shadow-2xl p-5 sm:p-6 mx-auto">
            <div class="flex justify-between items-center mb-4 border-b pb-3">
                <h3 id="staffModalTitle" class="text-base sm:text-lg font-bold text-gray-800"><i
                        class="fa-solid fa-user-pen text-blue-600 mr-2"></i> ข้อมูลผู้ดูแล</h3>
                <button onclick="closeStaffModal()" class="text-gray-400 hover:text-red-500 transition-colors"><i
                        class="fa-solid fa-xmark text-xl"></i></button>
            </div>

            <div class="space-y-3">
                <div>
                    <label class="text-xs font-bold text-gray-600 mb-1 block">ชื่อ - นามสกุล <span
                            class="text-red-500">*</span></label>
                    <input type="text" id="staffName"
                        class="w-full p-2 bg-gray-50 border border-gray-300 rounded-lg outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-sm">
                </div>
                <div>
                    <label class="text-xs font-bold text-gray-600 mb-1 block">ชื่อผู้ใช้ (Username) <span
                            class="text-red-500">*</span></label>
                    <input type="text" id="staffUser"
                        class="w-full p-2 bg-gray-50 border border-gray-300 rounded-lg outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-sm">
                </div>
                <div>
                    <label class="text-xs font-bold text-gray-600 mb-1 block">รหัสผ่าน (Password) <span id="pwdReqStar"
                            class="text-red-500">*</span></label>
                    <input type="password" id="staffPass"
                        class="w-full p-2 bg-gray-50 border border-gray-300 rounded-lg outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-sm"
                        placeholder="เว้นว่างไว้หากไม่ต้องการเปลี่ยน (กรณีแก้ไข)">
                </div>
                <div>
                    <label class="text-xs font-bold text-gray-600 mb-1 flex justify-between">
                        <span>ระดับสิทธิ์ <span class="text-red-500">*</span></span>
                        <span id="disabledHint"
                            class="text-[10px] text-red-500 hidden italic">ไม่สามารถลดสิทธิ์ตัวเองได้</span>
                    </label>
                    <select id="staffLevel"
                        class="w-full p-2 bg-gray-50 border border-gray-300 rounded-lg outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-sm cursor-pointer disabled:bg-gray-200 disabled:text-gray-500 disabled:cursor-not-allowed disabled:border-gray-200">
                        <option value="staff">Staff (ดูข้อมูลได้อย่างเดียว)</option>
                        <option value="superadmin">Super Admin (จัดการได้ทุกอย่าง)</option>
                    </select>
                </div>
            </div>

            <div class="mt-6 flex justify-end gap-2">
                <button onclick="closeStaffModal()"
                    class="px-4 py-2 text-gray-500 text-sm font-medium hover:bg-gray-100 rounded-lg transition-all">ยกเลิก</button>
                <button onclick="saveStaff()"
                    class="px-5 py-2 bg-blue-600 text-white text-sm font-bold rounded-lg shadow hover:bg-blue-700 transition-all">บันทึกข้อมูล</button>
            </div>
        </div>
    </div>

</div>

<script>
    let staffDataList = [];
    let editingStaffIndex = null;

    function loadStaffData() {
        if (!currentUser) return;
        google.script.run.withSuccessHandler(data => {
            staffDataList = data;
            renderStaffTable();
        }).getStaffData();
    }

    function renderStaffTable() {
        const loginPrompt = document.getElementById('staffLoginPrompt');
        const tableContainer = document.getElementById('staffTableContainer');
        const addBtn = document.getElementById('addStaffBtn');
        const thAction = document.getElementById('staffThAction');
        const tbody = document.getElementById('staffTableBody');

        if (!currentUser) {
            loginPrompt.classList.remove('hidden');
            tableContainer.classList.add('hidden');
            addBtn.classList.add('hidden');
            return;
        }

        loginPrompt.classList.add('hidden');
        tableContainer.classList.remove('hidden');

        if (currentLevel === 'superadmin') {
            addBtn.classList.remove('hidden');
            thAction.classList.remove('hidden');
        } else {
            addBtn.classList.add('hidden');
            thAction.classList.add('hidden');
        }

        tbody.innerHTML = '';

        if (staffDataList.length === 0) {
            const col = currentLevel === 'superadmin' ? 5 : 4;
            tbody.innerHTML = `<tr><td colspan="${col}" class="text-center p-6 text-gray-500">ไม่มีข้อมูลผู้ดูแล</td></tr>`;
            return;
        }

        staffDataList.forEach((row, index) => {
            const isSuperAdmin = row[4] === 'superadmin';
            const badgeClass = isSuperAdmin ? 'bg-purple-100 text-purple-700 border-purple-200' : 'bg-green-100 text-green-700 border-green-200';
            const badgeIcon = isSuperAdmin ? '<i class="fa-solid fa-crown text-[10px] sm:text-xs"></i>' : '<i class="fa-solid fa-user-check text-[10px] sm:text-xs"></i>';

            let deleteBtnHtml = '';
            if (row[1] === currentUser) {
                deleteBtnHtml = `<button class="w-7 h-7 sm:w-8 sm:h-8 flex justify-center items-center bg-gray-100 text-gray-300 rounded-lg cursor-not-allowed" title="ไม่สามารถลบตัวเองได้"><i class="fa-solid fa-trash text-[10px] sm:text-xs"></i></button>`;
            } else {
                deleteBtnHtml = `<button onclick="deleteStaff(${index}, '${row[1]}')" class="w-7 h-7 sm:w-8 sm:h-8 flex justify-center items-center bg-red-100 text-red-700 hover:bg-red-200 rounded-lg transition-all" title="ลบ"><i class="fa-solid fa-trash text-[10px] sm:text-xs"></i></button>`;
            }

            const actionCell = currentLevel === 'superadmin' ? `
        <td class="p-2 sm:p-4 align-middle">
          <div class="flex justify-center gap-1.5 sm:gap-2">
            <button onclick="editStaff(${index})" class="w-7 h-7 sm:w-8 sm:h-8 flex justify-center items-center bg-amber-100 text-amber-700 hover:bg-amber-200 rounded-lg transition-all" title="แก้ไข"><i class="fa-solid fa-pen text-[10px] sm:text-xs"></i></button>
            ${deleteBtnHtml}
          </div>
        </td>
      ` : '';

            tbody.innerHTML += `
        <tr class="hover:bg-blue-50/50 transition-colors">
          <td class="p-3 sm:p-4 text-center text-gray-500 font-medium">${row[0] || index + 1}</td>
          <td class="p-3 sm:p-4 font-bold text-gray-800">${row[1]}</td>
          <td class="p-3 sm:p-4 text-gray-600 font-mono text-[10px] sm:text-xs"><i class="fa-solid fa-at text-gray-400 mr-1"></i>${row[2]}</td>
          <td class="p-2 sm:p-4 text-center">
            <span class="inline-flex items-center justify-center gap-1 px-2 py-1 text-[10px] sm:text-xs font-bold rounded-md border whitespace-nowrap ${badgeClass}">
              ${badgeIcon} <span>${row[4]}</span>
            </span>
          </td>
          ${actionCell}
        </tr>
      `;
        });
    }

    function openStaffModal() {
        editingStaffIndex = null;
        document.getElementById('staffModalTitle').innerHTML = '<i class="fa-solid fa-user-plus text-blue-600 mr-2"></i> เพิ่มผู้ดูแลระบบ';
        document.getElementById('staffName').value = '';
        document.getElementById('staffUser').value = '';
        document.getElementById('staffPass').value = '';

        document.getElementById('staffLevel').value = 'staff';
        document.getElementById('staffLevel').disabled = false;
        document.getElementById('disabledHint').classList.add('hidden');

        document.getElementById('pwdReqStar').classList.remove('hidden');
        document.getElementById('staffModal').classList.remove('hidden');
    }

    function closeStaffModal() {
        document.getElementById('staffModal').classList.add('hidden');
    }

    function editStaff(index) {
        editingStaffIndex = index + 2;
        const row = staffDataList[index];

        document.getElementById('staffModalTitle').innerHTML = '<i class="fa-solid fa-user-pen text-amber-500 mr-2"></i> แก้ไขข้อมูลผู้ดูแล';
        document.getElementById('staffName').value = row[1];
        document.getElementById('staffUser').value = row[2];
        document.getElementById('staffPass').value = '';
        document.getElementById('staffLevel').value = row[4];

        const levelSelect = document.getElementById('staffLevel');
        const hintText = document.getElementById('disabledHint');

        if (row[1] === currentUser) {
            levelSelect.disabled = true;
            hintText.classList.remove('hidden');
        } else {
            levelSelect.disabled = false;
            hintText.classList.add('hidden');
        }

        document.getElementById('pwdReqStar').classList.add('hidden');
        document.getElementById('staffModal').classList.remove('hidden');
    }

    function saveStaff() {
        const name = document.getElementById('staffName').value;
        const user = document.getElementById('staffUser').value;
        const pass = document.getElementById('staffPass').value;
        const level = document.getElementById('staffLevel').value;

        if (!name || !user || (!pass && !editingStaffIndex)) {
            Swal.fire({ icon: 'warning', title: 'ข้อมูลไม่ครบ', text: 'กรุณากรอกข้อมูลให้ครบถ้วน' });
            return;
        }

        const data = { name, user, password: pass, level };

        Swal.fire({ title: 'กำลังบันทึก...', allowOutsideClick: false, didOpen: () => Swal.showLoading() });

        if (editingStaffIndex) {
            google.script.run.withSuccessHandler(() => {
                Swal.fire({ icon: 'success', title: 'สำเร็จ', text: 'อัปเดตข้อมูลผู้ดูแลแล้ว', timer: 1500, showConfirmButton: false });
                closeStaffModal();
                loadStaffData();
            }).updateStaffData(editingStaffIndex, data);
        } else {
            google.script.run.withSuccessHandler(() => {
                Swal.fire({ icon: 'success', title: 'สำเร็จ', text: 'เพิ่มผู้ดูแลใหม่แล้ว', timer: 1500, showConfirmButton: false });
                closeStaffModal();
                loadStaffData();
            }).saveStaffData(data);
        }
    }

    function deleteStaff(index, staffName) {
        if (staffName === currentUser) {
            Swal.fire({
                icon: 'error',
                title: 'ไม่อนุญาตให้ลบ',
                text: 'คุณไม่สามารถลบบัญชีของตัวเองที่กำลังใช้งานอยู่ได้'
            });
            return;
        }

        Swal.fire({
            title: 'ลบผู้ดูแลระบบ?',
            html: `คุณต้องการลบสิทธิ์ของ <b>${staffName}</b> ใช่หรือไม่?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#ef4444',
            confirmButtonText: '<i class="fa-solid fa-trash mr-1"></i> ยืนยันการลบ',
            cancelButtonText: 'ยกเลิก'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({ title: 'กำลังลบ...', allowOutsideClick: false, didOpen: () => Swal.showLoading() });
                const rowIndex = index + 2;
                google.script.run.withSuccessHandler(() => {
                    Swal.fire({ icon: 'success', title: 'ลบสำเร็จ', timer: 1500, showConfirmButton: false });
                    loadStaffData();
                }).deleteStaffData(rowIndex);
            }
        });
    }
</script>
