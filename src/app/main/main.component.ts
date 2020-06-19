
// import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
// import { Observable } from 'rxjs';
// import {Itemm} from '../models/item';

// export interface Item { id: string; name: string;start: string;end: string;price: string;status: string; }


// @Component({
//   selector: 'app-main',
//   templateUrl: './main.component.html',
//   styleUrls: ['./main.component.css']
// })
// export class MainComponent implements OnInit {
//   private itemsCollection: AngularFirestoreCollection<Item>;
//   item: Observable<Item[]>;
//   title = 'TourManagement';
//   constructor(private readonly afs: AngularFirestore) {
//     this.itemsCollection = afs.collection<Item>('item');
//    //this.items = this.itemsCollection.valueChanges();

//         // .valueChanges() is simple. It just returns the 
//         // JSON data without metadata. If you need the 
//         // doc.id() in the value you must persist it your self
//         // or use .snapshotChanges() instead. Only using for versions 7 and earlier
// this.item = this.itemsCollection.valueChanges( { idField: 'id' });
//   }

//   ngOnInit(): void {
//   }

// }


//  import { Component } from '@angular/core';


//  import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
//  import { Observable } from 'rxjs';


//  export interface Item { id: string; name: string;start: string;end: string;price: string;status: string; }



// @Component({
//   selector: 'app-root',
//   templateUrl: './app.component.html',
//   styleUrls: ['./app.component.css']
// })
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Itemm } from '../models/item';
import { ItemService } from '../services/item.service';
import { Observable } from 'rxjs';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  // public item$: Observable<Itemm[]>;
  // private image:any;
  public insertForm = new FormGroup({
    id: new FormControl('', Validators.required),
    image: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    start: new FormControl('', Validators.required),
    end: new FormControl('', Validators.required),
    price: new FormControl('', Validators.required),
    status: new FormControl('', Validators.required),
  })
  //ishighligh = true;
  private itemsCollection: AngularFirestoreCollection<Itemm>;
  itemList: Observable<Itemm[]>;

  constructor(
    private readonly afs: AngularFirestore, 
    private fb: FormBuilder, 
    private itemSrc: ItemService) {
    this.itemsCollection = afs.collection<Itemm>('item');
    this.itemList = this.itemsCollection.valueChanges({ idField: 'field1' });
    this.itemList = this.itemsCollection.valueChanges();
    this.itemList.subscribe(data => (console.log(data)))
  }
  ngOnInit(): void {
    //this.item$ = this.postSvc.getAllPosts();
  }
  Add(id: string = "add id",image: string = "add image", name: string = "add name",start: string = "add start", end: string = "add end",  price: string = "add price") {
    let it: Itemm = {};
    it.id = id;
    it.image = image;
    it.name = name;
    it.start = start;
    it.end = end;
    it.price = price;
    //it.status = status;
    // alert("thành công");
    let docid = "abc";
    this.itemsCollection.doc(docid).set(Object.assign({}, it));
  }
  Delete(docid = "abc") {
    this.itemsCollection.doc(docid).delete();
  }
  Update(name: string = "Update") {
    let docid = "abc"
    let item: Itemm = {};
    item.name = name
    this.itemsCollection.doc(docid).update(item);

  }
  onInsert(data: Itemm){
    console.log('New post', data);
    this.itemSrc.preAddAndUpdatePost(data);
  }
  onDeletePost(post: Itemm){
    
    this.itemSrc.deletePostById(post);
    alert('xóa thành công')
  }
  onEditPost(post: Itemm){
    console.log(post)
    this.insertForm.controls["id"].setValue(post.id)
    this.insertForm.controls["image"].setValue(post.image)
    this.insertForm.controls["name"].setValue(post.name)
    this.insertForm.controls["start"].setValue(post.start)
    this.insertForm.controls["end"].setValue(post.end)
    this.insertForm.controls["price"].setValue(post.price)
    this.insertForm.controls["status"].setValue(post.status)
    this.itemSrc.editPostById(post);
  }

  // addNewPost(data: Itemm){
  //   console.log('New post', data);
  //   this.postSvc.preAddAndUpdatePost(data,this.image);
  // }

  // handleImage(event:any): void{
  //   this.image = event.target.files[0]
  // }
}
