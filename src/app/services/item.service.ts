import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, finalize } from 'rxjs/operators';
import {Itemm} from '../models/item'
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import {FileI} from '../models/file.interface';
import { AstTransformer } from '@angular/compiler/src/output/output_ast';
import { AngularFireStorage } from '@angular/fire/storage';
@Injectable({
  providedIn: 'root'
})
export class ItemService {
  // private postsCollection: AngularFirestoreCollection<Itemm>;

  // private filePath: any;
  // private downloadURL: Observable<string>;

  itemsCollection:AngularFirestoreCollection<Itemm>;
  items:Observable<Itemm[]>;
  itemDoc:AngularFirestoreDocument<Itemm>;
  // constructor(private http:HttpClient) { }
  // // getItems():Observable <Itemm[]>{
  // //   return this.http.get<Itemm[]>('http://localhost:8000/api/items/');

  //   }

  constructor(
    public afs: AngularFirestore,
    private storage: AngularFireStorage,
    private http:HttpClient
    ) {
      this.itemsCollection = afs.collection<Itemm>('posts');
      this.itemsCollection=afs.collection<Itemm>('item', ref=>ref.orderBy('name', 'asc'));
      this.items=this.itemsCollection.valueChanges({idField: 'id1'});
      this.items.subscribe(data=>{console.log(data)});
   }
   getItems():Observable <Itemm[]>{
    return this.http.get<Itemm[]>('http://localhost:8000/api/items/');
    }

    addItem(item: Itemm){
      this.itemsCollection.add(item); //id dc tao tu dong
      //const docId=this.afs.createId();
      //this.itemsCollection.doc(docId).set(Object.assign{}, item);
     }
  //  public getAllPosts(): Observable<Itemm[]> {
  //   return this.postsCollection
  //     .snapshotChanges()
  //     .pipe(
  //       map(actions =>
  //         actions.map(a => {
  //           const data = a.payload.doc.data() as Itemm;
  //           const id = a.payload.doc.id;
  //           return { id, ...data };
  //         })
  //       )
  //     );
  // }


  // public getOnePost(id:Itemm): Observable<Itemm>{
  //   return this.afs.doc<Itemm>(`items/${id}`).valueChanges();
  // }




  // public deletePostById(item: Itemm){
  //   return this.postsCollection.doc(item.id).delete();
  // }


  // public editPostById(item: Itemm, newImage?: FileI){
  //   if(newImage){
  //     this.uploadImage(item,newImage);
  //   }else{
  //     return this.postsCollection.doc(item.id).update(item);
  //   }
  // }

  public preAddAndUpdatePost(post:Itemm): void{
    this.savePost(post);
  }

  private savePost(post:Itemm){
    const postObj = {
      id: post.id,
      name: post.name,
      image: post.image,
      price: post.price,
      status: post.status,
      start: post.start,
      end: post.end,
    };
    console.log('abc',postObj)
    this.itemsCollection.doc(post.id).set(Object.assign({}, postObj));
  }
  public deletePostById(post: Itemm){
    return this.itemsCollection.doc(post.id).delete();
  }
  public editPostById(post: Itemm){
    return this.itemsCollection.doc(post.id).update(post);
  }
}
  // private savePost(item: Itemm){
  //   const postObj = {
  //     id: item.id,
  //     image:  this.downloadURL,
  //     fileRef: this.filePath,
  //     name: item.name,
  //     start: item.start,
  //     end: item.end,
  //     price: item.price,
  //     status: item.status,

  //   };
    
    // if(item.id){
    //   return this.postsCollection.doc(item.id).update(postObj);
    // }else{
    //   return this.postsCollection.add(postObj);
    // }
  //   this.postsCollection.doc(item.id).set(Object.assign({}, postObj));
  // }



  //  private uploadImage(item: Itemm, image:FileI){
  //   this.filePath = `images/${image.name}`;
  //   const fileRef = this.storage.ref(this.filePath);
  //   const task = this.storage.upload(this.filePath, image);
  //   task.snapshotChanges()
  //   .pipe(
  //     finalize(() => {
  //       fileRef.getDownloadURL().subscribe(urlImage => {
  //         this.downloadURL = urlImage;
  //         this.savePost(item);
  //       });
  //     })
  //   ).subscribe();
  // }



