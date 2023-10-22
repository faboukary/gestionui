import { Component, OnInit } from '@angular/core';
import { Prestation, PrestationService } from '../prestation.service';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { map } from 'rxjs';


@Component({
  selector: 'app-prestation',
  templateUrl: './prestation.component.html',
  styleUrls: ['./prestation.component.css']
})
export class PrestationComponent implements OnInit{

  posts!: any[];
  closeResult!: string;
  mydata!: any;
  result!: any;
  editForm!: FormGroup;
  prestationdelete!: Prestation;

  // start test pagination model
 
  page = 1;             //the initial page to display
  collectionSize!: number  //total number of prestations in the list
  pageSize = 5;        //size of the first page

  searchTerm!: string;
  
  currentRate = 8;

  ListeDesPrestations!: Prestation[];

  AllPrestations!: Prestation[];

  getListeDesPrestations(): any{
    return this.prestationService.getPosts().subscribe((data: Prestation[]) => {
      this.collectionSize = data.length;
      this.ListeDesPrestations = data;
      this.AllPrestations = this.ListeDesPrestations;
    });
  }

  search(target: any): void {
    this.ListeDesPrestations = this.AllPrestations.filter((val) => val.libelle.toLowerCase().includes(target.value));
    this.collectionSize = this.ListeDesPrestations.length;
    // console.log('target : '+target.value);
  }

  refreshListeDesPrestations(){
    this.ListeDesPrestations = this.getListeDesPrestations()
    //.map((prestation: any, i: any) => ({id: i + 1, ...prestation}))
    //.slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }

  loadPrestations(){
    //this.getListeDesPrestations().subscribe( (x: any) => {
        this.ListeDesPrestations = this.getListeDesPrestations();
        this.refreshListeDesPrestations(); // Display the first page
    //});
  }

  /// end test pagination model

  constructor(private prestationService: PrestationService, private modalService: NgbModal, private fb: FormBuilder){

  }

  ngOnInit(): void {
    this.loadPrestations();
      
    this.editForm = this.fb.group({
      id: [''],
      libelle: [''],
      description: [''],
    } );

  }

  open(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  onSubmit(f: NgForm) {
    const url = 'http://localhost:8081/gestion-0.0.1-SNAPSHOT/prestation/addNew';
    
    // console.log(f.name?.valueOf);

    this.prestationService.httpClient.post(url, f.value).subscribe((result) => {
      
     // console.log(result);
      
      this.ngOnInit(); // reload the table

    });

    this.modalService.dismissAll(); //dismiss the modal
  }

  openDetails(targetModal: any, myprestation: Prestation) {

    this.modalService.open(targetModal, {
     centered: true,
     backdrop: 'static',
     size: 'lg'
   });

   document.getElementById('fid')?.setAttribute('value', ''+myprestation.id);

   document.getElementById('flibelle')?.setAttribute('value', myprestation.libelle);

   document.getElementById('fdescription')?.setAttribute('value', myprestation.description);

   // console.log('OK : '+myprestation.id +' ; '+myprestation.libelle+' ; '+myprestation.description);

 }

 
 openEdit(targetModal: any, myprestation: Prestation){

  this.modalService.open(targetModal, {
    backdrop: 'static',
    size: 'lg'
  });

  this.editForm.patchValue( {
    id: myprestation.id, 
    libelle: myprestation.libelle,
    description: myprestation.description
  });
  
  // console.log('OK : '+myprestation.id +' ; '+myprestation.libelle+' ; '+myprestation.description);

}

onSave(){
  const editURL = 'http://localhost:8081/gestion-0.0.1-SNAPSHOT/prestation/' + this.editForm.value.id + '/edit';

  // window.alert(editURL);

  // console.log(this.editForm.value);

  this.prestationService.httpClient.put(editURL, this.editForm.value).subscribe((results) => {
  this.ngOnInit();
  this.modalService.dismissAll();
  });

}

openDelete(targetModal: any, myprestation: Prestation) {
  
  this.modalService.open(targetModal, {
    backdrop: 'static',
    size: 'lg'
  });

  this.prestationdelete = myprestation;
 
}

onDelete() {
  let currentId = this.prestationdelete.id;

  // window.alert('id : '+currentId);
  
  const deleteURL = 'http://localhost:8081/gestion-0.0.1-SNAPSHOT/prestation/' + currentId + '/delete';

  this.prestationService.httpClient.delete(deleteURL)
    .subscribe((results) => {
      // console.log(' result :'+results);
      this.ngOnInit();
      this.modalService.dismissAll();
    });
}

}
