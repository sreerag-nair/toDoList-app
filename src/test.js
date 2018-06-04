



// setTimeout(function () {

//     res.send(notesObjArray = [
//         {
//             title: 'Shopping List',
//             list: [
//                 {
//                     content: 'Eggs are required for the body',
//                     isChecked: true
//                 },
//                 {
//                     content: 'Milk is white in color',
//                     isChecked: true
//                 },
//                 {
//                     content: 'Cereals always require milk.',
//                     isChecked: false
//                 },
//                 {
//                     content: 'Bread and butter make a man\'s breakfast',
//                     isChecked: true
//                 },
//             ]
//         },
//         {
//             title: 'Word List',
//             list: [
//                 {
//                     content: 'Cornucopia means too many in number',
//                     isChecked: false
//                 },
//                 {
//                     content: 'Abtruse means to interpret in a specific way',
//                     isChecked: false

//                 },
//                 {
//                     content: 'Orwellian is a term associated with a dystopian world',
//                     isChecked: true
//                 },
//                 {
//                     content: 'Obtuse means slow to understand',
//                     isChecked: false
//                 },
//             ]
//         },
//         {
//             title: 'Villain List',
//             list: [
//                 {
//                     content: 'Joker',
//                     isChecked: false
//                 },
//                 {
//                     content: 'Copperhead',
//                     isChecked: true
//                 },
//                 {
//                     content: 'Prometheus',
//                     isChecked: false
//                 },
//                 {
//                     content: 'Harley Quinn',
//                     isChecked: true
//                 }
//             ]
//         },
//         {
//             title: 'Shopping List',
//             list: [
//                 {
//                     content: 'Bring eggs',
//                     isChecked: true
//                 },
//                 {
//                     content: 'DONOT FORGET MILK!',
//                     isChecked: true
//                 },
//                 {
//                     content: 'ALWAYS BRING BREAD!!',
//                     isChecked: false
//                 },
//                 {
//                     content: 'NEVER FORGET THE KID!!',
//                     isChecked: true
//                 },
//             ]
//         },
//         {
//             title: 'Word List',
//             list: [
//                 {
//                     content: 'Cornucopia',
//                     isChecked: false
//                 },
//                 {
//                     content: 'Abtruse',
//                     isChecked: false

//                 },
//                 {
//                     content: 'Orwellian',
//                     isChecked: true
//                 },
//                 {
//                     content: 'Obtruse',
//                     isChecked: false
//                 },
//             ]
//         },
//         {
//             title: 'Villain List',
//             list: [
//                 {
//                     content: 'Joker',
//                     isChecked: false
//                 },
//                 {
//                     content: 'Copperhead',
//                     isChecked: true
//                 },
//                 {
//                     content: 'Prometheus',
//                     isChecked: false
//                 },
//                 {
//                     content: 'Harley Quinn',
//                     isChecked: true
//                 }
//             ]
//         },
//         {
//             title: 'Shopping List',
//             list: [
//                 {
//                     content: 'Eggs',
//                     isChecked: true
//                 },
//                 {
//                     content: 'Milk',
//                     isChecked: true
//                 },
//                 {
//                     content: 'Cereals',
//                     isChecked: false
//                 },
//                 {
//                     content: 'Bread',
//                     isChecked: true
//                 },
//             ]
//         },
//         {
//             title: 'Word List',
//             list: [
//                 {
//                     content: 'Cornucopia',
//                     isChecked: false
//                 },
//                 {
//                     content: 'Abtruse',
//                     isChecked: false

//                 },
//                 {
//                     content: 'Orwellian',
//                     isChecked: true
//                 },
//                 {
//                     content: 'Obtruse',
//                     isChecked: false
//                 },
//             ]
//         },
//         {
//             title: 'Villain List',
//             list: [
//                 {
//                     content: 'Joker',
//                     isChecked: false
//                 },
//                 {
//                     content: 'Copperhead',
//                     isChecked: true
//                 },
//                 {
//                     content: 'Prometheus',
//                     isChecked: false
//                 },
//                 {
//                     content: 'Harley Quinn',
//                     isChecked: true
//                 }
//             ]
//         }
//     ])
//     res.end();
// }, 1000)






// CREATING A HEAVY OBJECT

// getNotesTitle(user._id)
//     .then((notesTitleArray, err1) => {
//         // console.log("singleNoteEntry : ", notesTitleArray)
//         notesTitleArray.map((noteTitle, titleIndex) => {
//             //create a new entry with the title and _id
//             objToSend[titleIndex] = { _id: noteTitle._id, title: noteTitle.title, list: [] }
//             getAllNoteContent(noteTitle._id)
//                 .then((completeNoteContent, err) => {
//                     completeNoteContent.map((singleNoteEntry, noteContentIndex) => {
//                         objToSend[titleIndex].list.push({ content: singleNoteEntry.content, isChecked: singleNoteEntry.isChecked })
//                         // console.log("singleNoteEntry : ", singleNoteEntry.content)
//                     })

//                 })
//         })

//         console.log("AFTER : ", objToSend)
//     })


{/* <Col xl={6} style={{ height: '90vh' }}>
    <div style={{ paddingTop: '100px', }} >
        <Avatar src={this.imgSrc.src} size="large" shape="circle" style={{ height: '200px', width: '200px' }} />
        <Input readOnly style={{ textAlign: "center", marginTop: '10px', }} placeholder="EmailId" value={this.state.userInfoFromDb.emailId || ''} />
        <Input style={{ textAlign: "center", marginTop: '10px', }} onChange={this.userNameChanged.bind(this)} placeholder="User-name" value={this.state.userNameChanged} />
        <Input style={{ textAlign: "center", marginTop: '10px', }} onChange={this.nameChanged.bind(this)} placeholder="Please enter your name..." value={this.state.nameChanged} />
        {this.state.showPasswordChangeBoxes

            ? this.showPasswordChangeBoxes()

            : <Button type="primary" visible="false" onClick={() => this.setState({ showPasswordChangeBoxes: true })} style={{ background: 'black', marginTop: '10px', width: "100%" }}>Change Password</Button>}

        <Button loading={this.state.isUpdatingInProgress} onClick={this.updateData.bind(this)} type="primary" style={{ background: 'green', marginTop: '10px', width: "50%" }}>Update</Button>
        <Button type="danger" style={{ width: "50%", marginTop: '10px' }} onClick={this.resetPage} >Cancel</Button>
    </div>
    {this.displayRedirect()}
</Col> */}


