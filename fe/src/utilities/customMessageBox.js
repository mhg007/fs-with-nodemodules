import { h, ref, createApp, watch } from 'vue';
import { ElDialog, ElButton } from 'element-plus';

export default function customMessageBox(message, title, button1Label, button2Label, button3Label) {
  return new Promise((resolve) => {
    const visible = ref(true);

    const handleButton1Click = () => {
      resolve(button1Label);
      visible.value = false;
    };

    const handleButton2Click = () => {
      resolve(button2Label);
      visible.value = false;
    };

    const handleButton3Click = () => {
      resolve(button3Label);
      visible.value = false;
    };

    const handleClose = () => {
      resolve(null);
      visible.value = false;
    };

    const renderButtons = () => {
      return (
        <div class="my-button-container" style="padding-left: 30%">
          <ElButton class="_custom_button" style="background-image: linear-gradient(to bottom,white 8%, rgb(240,240,240) 48%); color: black;" onClick={handleButton1Click}>{button1Label}</ElButton>
          <ElButton class="_custom_button" style="background-image: linear-gradient(to bottom,white 8%, rgb(240,240,240) 48%); color: black;" onClick={handleButton2Click}>{button2Label}</ElButton>
          <ElButton class="_custom_button" style="background-image: linear-gradient(to bottom,white 8%, rgb(240,240,240) 48%); color: black;" onClick={handleButton3Click}>{button3Label}</ElButton>
        </div>
      );
    };

    const content = (
      <div>
        <p style="font-family:'Arial';font-size:'14px'">{message}</p>
        {renderButtons()}
      </div>
    );

    const app = createApp({
      data() {
        return {
          visible,
          handleClose,
          content,
        };
      },
      render() {
        return (
          <ElDialog
            title={title}
            v-model={this.visible}
            onClose={this.handleClose}
            showClose={false}
            width={'35%'}
            draggable={true}
            center={true}
            align-center={true}
            close-on-press-escape={false}
            close-on-click-modal={false}
          >
            {this.content}
          </ElDialog>
        );
      },
    });

    app.component('ElDialog', ElDialog);
    app.component('ElButton', ElButton);

    const vm = document.createElement('div');
    document.body.appendChild(vm);

    app.mount(vm);

    app.config.globalProperties.$destroy = () => app.unmount();

    const myDialog = app._context.components.ElDialog;

    watch(() => myDialog.$el, (el) => {
      if (el) {
        myDialog.proxy.$options.props['beforeClose'] = handleClose;

        myDialog.proxy.$on('update:modelValue', (val) => {
          if (!val) {
            app.unmount();
            resolve(null);
          }
        });

        resolve(myDialog);
      }
    });
  });
};
