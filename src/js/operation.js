export function afterAndBeforeOperation(tp, operation_id, type = 'all') {
	if(!tp.operations.length) return false
	
	let beforeOperation = null
	let afterOperation = null
	let currentOperation = null
	let last = true
	for(let operation of tp.operations) {
		if(operation.id != operation_id && last)
			beforeOperation = operation
		if(operation.id == operation_id && last) {
			currentOperation = operation
			last = false
		}
		if(operation.id != operation_id && !last) {
			afterOperation = operation
			break;
		}
	}
	if(!beforeOperation)
		beforeOperation = {full_name: 'Нет'}
	if(!afterOperation)
		afterOperation = {full_name: 'Эта последняя'}

	if(type == 'before')
		return beforeOperation
	else if(type == 'after')
		return afterOperation
	else 
		return {
			before: beforeOperation,
			after: afterOperation,
			current: currentOperation
		}
}

export async function getStatus(tech_proc, operation_id, curr_id=1, return_is='index') {
	if(!tech_proc.operations.length) return false

	let index = 0
	for(let inx in tech_proc.operations) {
		if(tech_proc.operations[inx].id == operation_id) 
			index = inx
	}

	if(return_is == 'index')
		return index

	if(return_is == 'pug') {
		let pug_true = '<p class="success_operation">Готово</p>'
		let pug_false = '<p class="work_operation">В процессе</p>'

		for(let inx in tech_proc.operations) {
			if(tech_proc.operations[inx].id == curr_id) {
				if(index > inx) return pug_true
				else return pug_false
			}
		}
	}
}

export class OperationTime {
	constructor(operation, kol_create_izd = 1) {
		if(!operation) return false

		this.pt = Number(operation.preTime) 
		this.mt = Number(operation.mainTime) 
		this.ht = Number(operation.helperTime) 
		this.kol_create_izd = Number(kol_create_izd)

		return {
			count: this.timeKolvo(),
			pt: this.pt,
			mt: this.mt,
			ht: this.ht
		}
	}
	static pt
	static mt
	static ht
	static kol_create_izd 

	timeKolvo() {
		return ((this.pt + ((this.mt + this.ht) * this.kol_create_izd)) / 60).toFixed(2)
	}
}

export function workingForMarks(operation, marks) {
	if(!marks || marks.length == 0) return 0
	let count = 0;
	let ot = new OperationTime(operation)
	for(let mark of marks) {
		count = count + this.worksHors(operation, mark.kol)
	}
	return count - ot.pt
}

export function returnKolvoBefore(oper) {
	let create = this.returnKolvoCreate(oper)
	return this.$props.izdeles.kolvo_shipments - create < 0 ? 0 : this.$props.izdeles.kolvo_shipments - create
}
/**
 * 
 * @param {*} oper 
 * @returns number
 */
export function returnKolvoCreate(oper) {
	if(!oper.marks || !oper.marks.length) return 0
	let kol = 0
	for(let mark of oper.marks) {
		kol = kol + mark.kol
	}
	return kol
}